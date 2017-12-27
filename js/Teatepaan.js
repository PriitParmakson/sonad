function kuvaTeade(teade, teateTyyp) {
  /*
    Avab teatepaani ja kuvab teate, HTML-na.
    Oluline: sisend peab olema murdskriptimise seisukohalt
    kontrollitud ja vajadusel puhastatud.
    Teate tüüp p.o kas 'OK' või 'NOK'. Vastavalt seatakse
    teate taustavärv (roheline või punane). Kui teatetüüp ei ole
    määratud, siis kuvatakse teade neutraalse taustavärviga.
    Kasutaja saab teate sulgeda.
  */
  // Eemalda eelmise teate tüüp
  $('#Teatepaan').removeClass('OKteade NOKteade');
  // Sea teatetüüp
  if (teateTyyp) {
    if (teateTyyp == 'OK') {
      $('#Teatepaan').addClass('OKteade');
    } else if (teateTyyp == 'NOK') {
      $('#Teatepaan').addClass('NOKteade');
    } 
  }  
  $('#Teatepaan').removeClass('peidetud');
  $('#Teatetekst').html(teade);
}

function seaTeatepaaniKasitlejad() {
  /*
    Teatepaani sulgemine
  */
  $('#TeatepaanSulge').click(() => {
    $('#Teatepaan').addClass('peidetud');
  });
}

seaTeatepaaniKasitlejad();
