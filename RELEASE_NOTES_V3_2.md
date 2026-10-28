# Eight Bells 3.2.0

**Pad mode**: play the FM-1's drums from a pad controller. Nothing here changes the notes a pattern sends; the pattern MIDI is byte-for-byte the same.

## New
- Pad mode button at the top: a 16-pad screen. A pad controller (tested design: M-VAVE SMC-PAD) plugs into the computer and each hit goes to the FM-1 as that firmware's drum note, or plays the browser kits when no FM-1 is connected.
- Learn pads, Edit pads, Record pad hits into the loop.
- Four banks: A drums, B the 16 punch effects, C step input (pads are the steps of one bar of the chosen track), D launcher (sections queue for the end of the loop, plus dice rolls).
- Controller Play, Stop, Record, `<` `>` and knobs 1 to 4 (tempo, swing, volume, kit). The pad also works in Live view.
- On-screen pads and keyboard keys work without any controller.

## Not yet tested
- A real SMC-PAD (the note and controller numbers come from a community profile), and Bluetooth MIDI.
