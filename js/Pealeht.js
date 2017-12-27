/* Globaalsed elemendid */
const url = 'https://script.google.com/macros/s/AKfycbwUpV3mdNFMcMB69Ja9rK-D9WljGhuhfm4xvIqOyXbAveYSllg/exec';

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
    $('#Teatepaan')
      .addClass('OKteade');
    $('#Teatetekst')
      .text('Teenus on avatud.');
    console.log('Teenus on avatud.');
    esitaSonad(saadudJSON.Kirjed);
  })
  .catch(error => {
    $('#Teatepaan')
      .addClass('NOKteade');
    $('#Teatetekst')
      .text('Teenus ei ole avatud.');
    console.log('Teenus ei ole avatud.');
  });
}

function esitaSonad(kirjed) {
  kirjed.forEach(kirje => {
    var p = $('<p></p>').text(kirje.Kirje);
    $('#sonaKirjed').append(p);
  });
}