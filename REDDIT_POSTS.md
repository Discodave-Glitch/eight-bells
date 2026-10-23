# Reddit post for Eight Bells V3 (r/MVaveFM1, flair: Showcase)

**Title:** Eight Bells: a free pattern maker for FM-1 firmwares, with 28 engines, 187 genres and a song builder

**Body:**

I made a free pattern maker for the M-VAVE FM-1 and its custom firmwares (Sloop, x0x, Felucca and others). Pick a genre and it writes a beat, bass line, chords and melody for every track, then plays them on your FM-1 over USB MIDI. It runs in the browser, and there are Windows and Mac apps too.

Use it now: https://discodave-glitch.github.io/eight-bells/
Apps and code: https://github.com/Discodave-Glitch/eight-bells

**What it does**

- **187 genres**, from ambient at 40 BPM to blast beats at 235, with odd meters.
- **28 engines** decide how the notes are chosen. Euclid is the classic even spacing. Others use real world rhythms (West African bell patterns, Afro-Cuban claves, Balkan and Indian beats), cellular automata, fractals, number sequences like Fibonacci and pi, chaos, Markov chains, polyrhythms and more. Most of them also shape the melody and the chord progression. Some keep the Euclidean rhythm and only change the melody and chords (circle of fifths, pentatonic, call and response and so on).
- **Song builder**: tap Intro, Build-up, Drop, Chorus, Breakdown and the rest into an order, choose how many loops each gets, and play it back as a song. On a Sloop, the 16 punch effects sit in the same panel so you can hold them over the top live.
- **Auto song** keeps changing the pattern on its own, and leaves any track you lock exactly as it is.
- **Seeds and share codes**: every pattern has a short code you can paste into a comment, so anyone can get the same pattern back. Save your favourites in My seeds.
- **New in V3**: a desktop layout for Windows and Mac, instruments and drum kits so it sounds out of the box with no FM-1, a Sample track with voices, numbers, letters and spoken words, a Level, Pan and meter on every track, Clear buttons so you can start from blank tracks, and a light/dark button.
- Solo, mute, swing, humanise, key and scale, track colours, and a list of the steps if you'd rather enter a pattern by hand. It remembers where you left off.

**Good to know**

- It doesn't work on iPhone or iPad, because Safari has no Web MIDI. Chrome on Android works with a USB OTG adapter.
- Close Slipway and the Sloop editor before connecting, so only one program has the FM-1's MIDI port.
- The desktop apps aren't code-signed, so Windows or macOS may warn you the first time you open them.
- The Drift engine gives tracks different lengths, so on the FM-1 you set each track's LENGTH to match. I haven't tested every firmware with odd lengths, so tell me what you find.
- Some parts (Capture, the Mac app, Android, Auto song over MIDI) are untested on real hardware. Bug reports are welcome.

If you try it, post your seed in the comments and say which firmware you used.
