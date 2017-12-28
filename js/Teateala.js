function kuvaTeade(teade, teateTyyp) {
  /*
    Avab Teateala ja kuvab teate, HTML-na.
    Oluline: sisend peab olema murdskriptimise seisukohalt
    kontrollitud ja vajadusel puhastatud.
    Teate tüüp p.o kas 'OK' või 'NOK'. Vastavalt seatakse
    teate taustavärv (roheline või punane). Kui teatetüüp ei ole
    määratud, siis kuvatakse teade neutraalse taustavärviga.
    Kasutaja saab teate sulgeda.
  */
  // Eemalda eelmise teate tüüp
  $('#Teateala').removeClass('OKteade NOKteade');
  // Sea teatetüüp
  if (teateTyyp) {
    if (teateTyyp == 'OK') {
      $('#Teateala').addClass('OKteade');
    } else if (teateTyyp == 'NOK') {
      $('#Teateala').addClass('NOKteade');
    } 
  }  
  $('#Teateala').removeClass('peidetud');
  $('#Teatetekst').html(teade);
}

function seaTeatealaKasitlejad() {
  /*
    Teateala sulgemine
  */
  $('#TeatealaSulge').on('click', e => {
    $('#Teateala').addClass('peidetud');
  });
}
