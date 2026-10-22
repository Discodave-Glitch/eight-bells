<p align="center"><img src="logo.svg" width="96" alt="Eight Bells logo"></p>

# Eight Bells

Euclidean beats and melodies for the **M-VAVE FM-1** and its custom firmwares. Pick a genre, get a pattern for every track, play it on the FM-1 over USB MIDI (or in your browser), and record it into the FM-1.

From the maker of [Slipway](https://github.com/Discodave-Glitch/slipway).

**Use it now: <https://discodave-glitch.github.io/eight-bells/>**

![Pick from 109 genres](docs/screenshot-top.png)

![Every track, with lock, mute, redo, fill, ghost notes and a busy slider](docs/screenshot-tracks.png)

![Save seeds and let Auto song play on its own](docs/screenshot-seeds.png)

## What it does

- **109 genres** in nine groups: House & Techno, Trance & Hard, Bass & Breaks, Hip-hop & Grime, Funk & Disco, World, Rock & Pop, Slow & Ambient and Experiment. They run from ambient at 40 BPM to blast beats at 235, with odd meters and Euclidean experiments too. Each one builds its rhythms from Euclidean patterns, with fixed anchor steps where the genre needs them. There is a search box and a Surprise me button to find your way around.
- **Up to 8 tracks**, depending on the firmware you pick (for example 4 on Sloop, 8 on firmwares that have more).
- **Plays on the FM-1** over USB MIDI, with the right channels and drum notes for the firmware, or plays in your browser.
- **Records into the FM-1**: the app tells you the settings to use on the REC screen.
- **Song sections** in the order you would build a track: intro, build-up, drop, chorus, breakdown, bridge, half-time, outro.
- **Per-track controls**: lock, mute, solo, redo, new notes, fill, ghost notes, a busy slider, and Euclidean hits, steps and rotate.
- **Feel**: swing, accent, humanise, key and scale.
- **Sound controls** that send MIDI controllers (filter, release, pan, reverb, delay, level) while it plays.
- **Seeds and share codes**: every pattern has a seed, and a share code you can post for others to load.
- **My seeds**: save patterns with a name, recall them later, and paste in codes other people shared (a whole Reddit comment works). They are kept in your browser.
- **Auto song**: plays on its own and changes the pattern every 1, 2, 4 or 8 loops, sometimes going back to an earlier one. It can use random patterns (this genre, or other genres near your tempo), your saved seeds, or both. It keeps your tempo.
- **.mid export** for a DAW.
- **Firmware list** with each firmware's maker credited, and the MIDI settings it needs.

## Ways to run it

| Where | How |
| --- | --- |
| **Web page** | Open the link above in Chrome or Edge (Firefox also supports MIDI). On a phone you can use "Add to home screen". |
| **Windows** | Download from [Releases](../../releases). `Eight-Bells-1.0.0.exe` is portable (no install), and `Eight-Bells-Setup-1.0.0.exe` installs it. |
| **Mac** | Coming soon. The Mac build is set up but not published yet. |
| **Android** | Use the web page in Chrome, with the FM-1 connected through a USB OTG adapter. There is no separate Android app, and this is not tested yet. |
| **iPhone and iPad** | Not supported. Safari has no Web MIDI, and every browser on iOS uses Safari's engine. |

The desktop apps are not code-signed. Windows may show a SmartScreen warning (choose More info, then Run anyway). On a Mac, right-click the app and choose Open the first time. If macOS still refuses, open System Settings, then Privacy & Security, and choose Open Anyway.

### Removing it

The portable `.exe` installs nothing, so delete the file to remove it. The installer adds Eight Bells to Settings, then Apps, where you can uninstall it. Saved seeds and colours live in a folder called `Eight Bells` or `eight-bells` inside `%AppData%`. Delete that folder to clear them.

Everything runs on your own computer. Eight Bells does not upload anything, has no account and collects no data. Your saved seeds and colours are kept in your browser.

## Playing and recording on the FM-1

1. Connect the FM-1 with a USB data cable and switch it on.
2. Close anything else that uses its MIDI port: Slipway, the firmware's own web editor and the M-VAVE workbench. Only one app can use the port at a time.
3. Open Eight Bells, choose your firmware in **Play on the FM-1**, then tap **Connect MIDI**.
4. Pick a genre and press **Play**.
5. To record: set the FM-1 tempo to exactly the tempo shown in the app. On the REC screen set **LENGTH** to the number of bars, **START NOTE** and **QUANT ON** until it shows REC READY. Switch on only one track in the app, press Play, and repeat for each track. The app shows the steps for your firmware.

The FM-1's tempo cannot be changed from the app. Set it by hand to match.

## Seeds and share codes

Every Generate has a seed. The **Share this pattern** box shows a code such as `EB1:amapiano:2:x0x:sf5jxm:115:54`. It holds the genre, length, firmware, seed, tempo and swing.

- **Share:** tap **Copy for Reddit** and paste it into a post or comment.
- **Load someone else's:** paste the code into the **Seed** box. It loads straight away.
- A plain seed (no `EB1:` part) needs you to tap the same genre and match the length and firmware.

Edits to single steps, locks, Redo and Fill are not in that short code. For those, use **Copy exact pattern**: it makes a longer code (`EB2:...`, a few hundred characters) that holds every step, note and velocity, so the pattern plays exactly as made. Paste it into the Seed box the same way. You can paste a whole Reddit comment and it finds the code inside.

The exact code only loads on a firmware with the same track layout it was made for.

## Capture a song from the FM-1

Eight Bells can listen to the FM-1 and turn a loop it plays into tracks, which you can edit and share as an exact pattern code.

1. On Sloop, set **GLO, then MIDI 2, then OUT** to **SEQ** so the sequencer sends its notes over USB. Other firmwares may have a similar setting.
2. In **Play on the FM-1**, open **MIDI monitor**, tap **Connect MIDI**, choose the FM-1 as the input and tap **Listen**. Start a pattern on the FM-1: its notes should appear in the list.
3. Set the app tempo to exactly the FM-1 tempo, and choose the same number of bars as the loop.
4. Tap **Capture a loop**, stop the FM-1 pattern, then press Play on the FM-1. The first note heard becomes step 1. If it starts a step late or early, use the Move buttons.

Notes are put on tracks by their MIDI channel, or you can pick the track yourself and capture one at a time. Chords are reduced to their lowest note.

## Punch effects (Sloop)

Sloop (2.7 and later) plays its 27 punch-in effects from MIDI on notes F3 to G5. On the FM-1 set **GLO, then MIDI 3, then FX CH** to a free channel (for example 11), choose the same channel in **Punch effects** in Eight Bells, and hold a button to run an effect on the whole mix. The panel only appears when Sloop is the selected firmware.

The 16 white-key effects are named from Sloop's guide. Holding the buttons was tried on a real FM-1 and does trigger effects on the whole mix, but I have not yet checked every button against its name (loops, stutter, reverse, tape stop, half speed, low-pass and high-pass sweeps, phone, bit crush, alias, gate, echo, tape wobble). The 11 black-key effects (kill low, mid and high, rewind, octave up, flanger, auto-pan, freeze, loop 8T, mono, fade out) are named from Sloop's wiki, but the wiki does not say which black key plays which, so their order is an assumption and their buttons have dashed borders. Please open an issue if any are in the wrong place.

Other firmwares don't publish a MIDI effects setting that I could find (X0X's readme says its effects are panel-only), so the panel is hidden for them.

## Firmware support

Settings come from each firmware's own documentation where it publishes a MIDI map. The app marks each one as confirmed, likely or not published. Where a firmware has no published map, it starts from General MIDI defaults and gives you Test buttons to find the right channels and notes. If something is wrong for your firmware, please [open an issue](../../issues) with the channels and notes it really uses.

Parameter locks are not controllable over MIDI on the firmwares I have checked, so the app cannot trigger them. Punch effects can be triggered on Sloop only (see above).

## Run or build from source

The whole app is the single file `index.html`. Open it in Chrome or Edge to run it.

To run the desktop app or build the installers:

```
npm install
npm start          # run the desktop app
npm run dist       # build an installer for the system you are on
```

Pushing a tag such as `v1.0.0` runs the GitHub Actions workflow that builds the Windows and Mac apps and attaches them to a release.

## Credits and licence

Eight Bells is MIT licensed (see `LICENSE`). It is not made by or affiliated with M-VAVE.

The firmwares it works with are made by other people, and the app credits each maker next to its release link: Sloop by isod89, X0X by Charles Vestal, Felucca by Leo Kuroshita (Hügelton Instruments), JIANT by juanjiant-bit, FM-1+VA by Baud Girl, and the official firmware by M-VAVE, among others. Each firmware has its own licence, so check the project's page. Eight Bells does not include any of their code.
