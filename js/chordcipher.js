var e6 = new Tone.Sampler("notes/acoustic/E.wav").toMaster();
var a5 = new Tone.Sampler("notes/acoustic/A.wav").toMaster();
var d4 = new Tone.Sampler("notes/acoustic/D.wav").toMaster();
var g3 = new Tone.Sampler("notes/acoustic/G.wav").toMaster();
var b2 = new Tone.Sampler("notes/acoustic/B.wav").toMaster();
var e1 = new Tone.Sampler("notes/acoustic/E8.wav").toMaster();

var soundFix = new Tone.Sampler("notes/acoustic/E.wav").toMaster();
soundFix.volume.value = -80;
var list_chords = null;

var acoustic_notes = [e6, a5, d4, g3, b2, e1];

/*
function playChord(chord) {
  for(i = 0; i < chord.length; i++) {
    if (!isNaN(chord[i])) {
      acoustic_notes[i].triggerAttackRelease(Math.floor(chord[i]), 0.6, "+0");
    }
  }
}
*/

function executeChord(shape) {
  shape = shape.split(" ");

  if (!isNaN(shape[0])) {
    acoustic_notes[0].triggerAttack(Math.floor(shape[0]), "+0", 1);
  }

  if (!isNaN(shape[1])) {
    acoustic_notes[1].triggerAttack(Math.floor(shape[1]), "+0", 1);
  }

  if (!isNaN(shape[2])) {
    acoustic_notes[2].triggerAttack(Math.floor(shape[2]), "+0", 1);
  }

  if (!isNaN(shape[3])) {
    acoustic_notes[3].triggerAttack(Math.floor(shape[3]), "+0", 1);
  }

  if (!isNaN(shape[4])) {
    acoustic_notes[4].triggerAttack(Math.floor(shape[4]), "+0", 1);
  }

  if (!isNaN(shape[5])) {
    acoustic_notes[5].triggerAttack(Math.floor(shape[5]), "+0", 1);
  }
}


function clear() {
  e1.triggerRelease();
  b2.triggerRelease();
  g3.triggerRelease();
  d4.triggerRelease();
  a5.triggerRelease();
  e6.triggerRelease();
}

function getChords() {
  var html = null;

  $.get("pais_e_filhos.html", function(data) {
    html = $(data).find('script');

    $(html).filter(function(){
      var data = $(this);

      var re = /chords.*]/i;
      data.each(function(i, elem) {
        var content = $(this).text();
        var found = content.match(re);

        if (found != null) {
          var attr = found[0];

          var chords = attr.split('chords:')[1];
          var parsedChords = JSON.parse(chords);

          //parsed JSON with the array of chords
          //console.log(parsedChords);

          list_chords = parsedChords;
          mapChord(list_chords);
        }
      });
    });
  });
}

function mapChord(list_chord) {
  var chords = {}
  var li, div, span;

  for(i = 0; i < list_chord.length; i++) {
    chords[list_chord[i]["chord"]] = list_chord[i]["guitar"][0].split(" ");

    li = document.createElement('li');
    li.id = "chord-item-" + i;
    document.getElementById("chordsContainer").appendChild(li);

    div = document.createElement('div');
    div.id = "chord-" + i;
    div.className = "circle";
    document.getElementById("chord-item-" + i).appendChild(div);
    document.getElementById("chord-" + i).dataset.chord = list_chord[i]["guitar"][0];

    span = document.createElement('span');
    span.innerHTML = list_chord[i]["chord"];
    document.getElementById("chord-" + i).appendChild(span);
  }

  list_chords = chords;

  for(i = 0; i < list_chord.length; i++) {
    $("#chord-" + i).on('touchstart', function(){
      playChord($(this).data("chord").split(" "));
    });
  }
}
