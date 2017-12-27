/* Globaalsed elemendid */
const url = 'https://script.google.com/macros/s/AKfycbwUpV3mdNFMcMB69Ja9rK-D9WljGhuhfm4xvIqOyXbAveYSllg/exec';
var autenditud = false; // Kas kasutaja on Google Sign-In teenuse abil autenditud
/* Google Sign-In funktsioon, millega saab salvestamisel
pärida ID token-i */
var kasutaja;

function alusta() {
  laeSonad();
  /* Käsitleja eksamitöö esitamise nupule
  $('#esitaNupp').on('click', e => {
    e.preventDefault(); 
    esitaEksamitoo();
  }); */
}

function laeSonad() {
  fetch(url)
  .then(response =>  {
    return response.json();
  })
  .then(saadudJSON => {
    kuvaTeade('Teenus on avatud.', 'OK');
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