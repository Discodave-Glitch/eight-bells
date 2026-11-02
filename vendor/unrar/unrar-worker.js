/* Reads .rar archives inside the browser. Runs the free UnRAR code (compiled to WebAssembly) in a worker, reading the file in slices so even very big packs do not have to fit in memory at once. */
function RarCore(mod,reader){
  var mem=null, ex=null, pos=0, SIZE=reader.size, enc=new TextEncoder(), dec=new TextDecoder();
  function dv(){ return new DataView(mem.buffer); }
  function u8(){ return new Uint8Array(mem.buffer); }
  function name(p,l){ return dec.decode(u8().subarray(p,p+l)); }
  function isA(p,l){ var n=name(p,l).replace(/^\/+/,''); return n==='a.rar'; }
  var wasi={
    fd_prestat_get:function(fd,b){ if(fd!==3) return 8; dv().setUint8(b,0); dv().setUint32(b+4,1,true); return 0; },
    fd_prestat_dir_name:function(fd,p,l){ u8()[p]=47; return 0; },
    path_open:function(d,df,p,l,of,rb,ri,ff,out){ if(!isA(p,l)||(of&1)) return 44; dv().setUint32(out,4,true); pos=0; return 0; },
    fd_close:function(){ return 0; },
    fd_fdstat_get:function(fd,b){ var v=dv(); v.setUint8(b,fd===3?3:(fd===4?4:2)); v.setUint16(b+2,0,true); v.setBigUint64(b+8,0x1fffffffn,true); v.setBigUint64(b+16,0x1fffffffn,true); return 0; },
    fd_read:function(fd,iov,n,out){ if(fd!==4) return 8; var v=dv(), tot=0;
      for(var i=0;i<n;i++){ var ptr=v.getUint32(iov+i*8,true), len=v.getUint32(iov+i*8+4,true); if(!len) continue; if(pos>=SIZE) break; var want=Math.min(len,SIZE-pos), chunk=reader.read(pos,want); u8().set(chunk,ptr); pos+=chunk.length; tot+=chunk.length; if(chunk.length<len) break; v=dv(); }
      dv().setUint32(out,tot,true); return 0; },
    fd_seek:function(fd,off,wh,out){ if(fd!==4) return 70; var o=Number(off), np=wh===0?o:(wh===1?pos+o:SIZE+o); if(np<0) return 28; pos=np; dv().setBigUint64(out,BigInt(pos),true); return 0; },
    fd_write:function(fd,iov,n,out){ var v=dv(), t=0; for(var i=0;i<n;i++) t+=v.getUint32(iov+i*8+4,true); v.setUint32(out,t,true); return 0; },
    path_filestat_get:function(fd,fl,p,l,b){ if(!isA(p,l)) return 44; var v=dv(); for(var i=0;i<64;i+=8) v.setBigUint64(b+i,0n,true); v.setUint8(b+16,4); v.setBigUint64(b+24,1n,true); v.setBigUint64(b+32,BigInt(SIZE),true); return 0; },
    clock_time_get:function(id,pr,out){ dv().setBigUint64(out,BigInt(Date.now())*1000000n,true); return 0; },
    proc_exit:function(c){ throw new Error('rar exit '+c); }
  };
  ['fd_filestat_set_size','path_create_directory','path_link','path_remove_directory','path_rename','path_symlink','path_unlink_file'].forEach(function(k){ wasi[k]=function(){ return 63; }; });
  var inst=new WebAssembly.Instance(mod,{wasi_snapshot_preview1:wasi,env:{_Unwind_CallPersonality:function(){ throw new Error('rar error'); },__cxa_get_exception_ptr:function(){ return 0; },getpid:function(){ return 1; }}});
  ex=inst.exports; mem=ex.memory; ex._initialize();
  function cstr(p){ var m=u8(), e=p; while(m[e]) e++; return dec.decode(m.subarray(p,e)); }
  return {
    open:function(){ return ex.rw_open(); },
    next:function(){ var r=ex.rw_next(); if(r!==0) return null; return {name:cstr(ex.rw_name()),dir:!!ex.rw_isdir(),size:ex.rw_size_hi()*4294967296+ex.rw_size_lo()}; },
    skip:function(){ return ex.rw_skip(); },
    extract:function(){ var r=ex.rw_extract(); if(r!==0) return null; var n=ex.rw_len(), p=ex.rw_data(); return u8().slice(p,p+n); },
    close:function(){ ex.rw_close(); }
  };
}
if(typeof WorkerGlobalScope!=='undefined'&&typeof self!=='undefined'&&self instanceof WorkerGlobalScope){
  self.onmessage=async function(e){ var m=e.data;
    try{ var wu=new URL('unrar.wasm',self.location.href), mod; try{ mod=await WebAssembly.compileStreaming(fetch(wu)); }catch(x){ mod=await WebAssembly.compile(await (await fetch(wu)).arrayBuffer()); } var  fr=new FileReaderSync(), f=m.file;
      var rc=RarCore(mod,{size:f.size,read:function(o,n){ return new Uint8Array(fr.readAsArrayBuffer(f.slice(o,o+n))); }});
      var r=rc.open(); if(r!==0) throw new Error('This RAR could not be opened'+(r===22||r===24?' (it is password protected or split)':'')+'.');
      var want=new RegExp(m.want,'i'), got=0, h;
      while((h=rc.next())){ if(!h.dir&&want.test(h.name.split('/').pop())&&h.size<=m.maxEntry&&got<m.maxCount){ var d=rc.extract(); if(d){ got++; self.postMessage({name:h.name,data:d.buffer},[d.buffer]); } else self.postMessage({bad:h.name}); } else rc.skip(); }
      rc.close(); self.postMessage({done:true});
    }catch(err){ self.postMessage({error:String(err&&err.message||err)}); } };
} else if(typeof module!=='undefined') module.exports={RarCore:RarCore};
