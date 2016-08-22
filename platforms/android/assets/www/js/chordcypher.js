var e6 = new Tone.Sampler("notes/acoustic/E.wav").toMaster();
var a5 = new Tone.Sampler("notes/acoustic/A.wav").toMaster();
var d4 = new Tone.Sampler("notes/acoustic/D.wav").toMaster();
var g3 = new Tone.Sampler("notes/acoustic/G.wav").toMaster();
var b2 = new Tone.Sampler("notes/acoustic/B.wav").toMaster();
var e1 = new Tone.Sampler("notes/acoustic/E8.wav").toMaster();

var acoustic_notes = [e6, a5, d4, g3, b2, e1];

function playChord(chord) {
  for(i = 0; i < chord.length; i++) {
    if (!isNaN(chord[i])) {
      acoustic_notes[i].triggerAttackRelease(Math.floor(chord[i]), 1, "+0");
    }
  }
}
