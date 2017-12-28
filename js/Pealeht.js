/* Globaalsed elemendid */
const url = 'https://script.google.com/macros/s/AKfycbwUpV3mdNFMcMB69Ja9rK-D9WljGhuhfm4xvIqOyXbAveYSllg/exec';
var autenditud = false; // Kas kasutaja on Google Sign-In teenuse abil autenditud
/* Google Sign-In funktsioon, millega saab salvestamisel
pärida ID token-i */
var kasutaja;

function alusta() {
  laeSonad();
  /* Käsitleja uue sõna salvestamise nupule */
  $('#SalvestaUusSonaNupp').on('click', e => {
    salvestaSona();
  });
  seaTeatealaKasitlejad();
}

function laeSonad() {
  fetch(url)
  .then(response =>  {
    return response.json();
  })
  .then(saadudJSON => {
    esitaSonad(saadudJSON.Kirjed);
  })
  .catch(error => {
    kuvaTeade('Teenus ei ole avatud.', 'NOK');
    console.log('Teenus ei ole avatud.');
  });
}

function esitaSonad(kirjed) {
  kirjed.forEach(kirje => {
    var p = $('<p></p>').text(kirje.Kirje);
    $('#sonaKirjed').append(p);
  });
}

function salvestaSona() {
  var sona = $('#UusSona').val();
  kuvaTeade(sona + ' salvestatud.', 'OK');

  /* ID token on oluline võtta iga kord enne salvestamist, sest see aegub tunniga. */
  var id_token = kasutaja.getAuthResponse().id_token;  

  // Koosta saadetav objekt
  var s = {
    sona: sona
  }; 

  // Salvesta vastused POST-päringuga Google töölehele
  var postDeferred = $.post(url, s);
  postDeferred.done(function (data, status) {
    // Logi tulemus sirviku konsoolile
    console.log('salvestaSona: POST vastus: data (töölehe tulemus): ' + data.result);
    console.log('salvestaSona: POST vastus: status: ' + status);
    // Töötle jQuery vastus
    if (status !== 'success') {
      kuvaTeade('Salvestamine ebaõnnestus. Veakood: jQuery ' + status, 'NOK');
      return
    }
    // Töötle töölehe vastus
    if (data.result == 'success') {
      kuvaTeade('Salvestatud.', 'OK');
    } else { 
      kuvaTeade('Salvestamine ebaõnnestus. Veakood: Google Apps ' + data.error.message, 'NOK');
      return
    }
	});

}