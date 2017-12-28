---
permalink: Spekk
---

# Spetsifikatsioon

Terminoloogia
- `sõna` on huvitav, oluline sõna või fraas
- `sõnakirje` on eraldi rea või lõiguna esitatud `sõna` koos vastetega, selgitustega, määratlusega, kasutusnäidetega jms
- `sõnakirje siseesitus` on sõnakirje salvestamiseks sobilik kuju
- `kategooria` on sõna liik; sõna võib kuuluda mitmesse kategooriasse
  - kategooriate nimekirja hoitakse `_data` kaustas

Rakenduse funktsionaalsus
- kuvab sõnaloetelu
- loetelu saab filtreerida kategooria kaupa
- autenditud kasutaja saab lisada uue sõnakirje
- autenditud kasutaja saab muuta sõnakirjet

Sõnade salvestamine
- salvestatakse Google Drive arvutustabelisse
  - kasutaja `priit.parmakson@gmail.com` alla
  - arvutustabeli nimi on `SONAD` ja URL `https://docs.google.com/spreadsheets/d/1-1BP-pSobA1oXvrpAzmdgpxB0p-buvzGBwjRS-PILbk/edit#gid=0`

___Google Apps Script projekt___ `SONAD`
- on vajalik arvutustabelile ligipääsuks üle veebi
- on sisuliselt Google Apps Script failide kogum; kogumis võib olla ka HTML-faile
- moodustatakse `Tools`, `Script Editor`
- arvutustabel on projekti konteiner (_container-bound script_)
- tuleb avaldada veebirakendusena (_web app_)
- avaldamisele eelneb versiooni moodustamine: `File`, `Manage versions`, `Save new version`
- seejärel `Publish`, `Deploy as web app`, vali uus versioon, `Update`
- vali, et projekti täidetakse sinu nimel (`priit.parmakson@gmail.com`)
- vali, et ligi pääsevad kõik, ka anonüümsed kasutajad (OAuth mõttes kasutajad, s.t kasutaja sirvikusse laetud rakendus).
  - Märkus: järgnev loaandmisdialoog vajab selgitamist.
- kopeeri veebirakenduse URL: `https://script.google.com/macros/u/0/s/AKfycbwUpV3mdNFMcMB69Ja9rK-D9WljGhuhfm4xvIqOyXbAveYSllg/exec`
  
NB! Kui oled sirvikus sisse logitud mitme Google kontoga, siis lisab Google ülalolevasse veebirakenduse URL-i järjenumbri, kujul `u/0/`. See tuleb eemaldada, siis URL töötab!
{:.nb}
 
Pilveprojekt (_Google Cloud Project_) `SONAD`    
- arvutustabeli projekiga `SONAD` on seotud taustal moodustatud Google pilveplatvormi projekt `SONAD`
- pilveplatvormi projekt on nagu vahelüli
- pilveplatvormi projektile pääseb ligi Google Apps skriptiredaktorist: `Resources`, `Cloud Platform Project`
- töölehe projekti ei tohi ümber siduda teisele pilveplatvormi projektile. Ümbersidumisega lähevad õigused kaotsi.
- klõpsa pilveplatvormi projekti nimel; avaneb Google pilveplatvormi konsool
- ___API-de sisselülitamine___. pilveplatvormi projektis tuleb sisse lülitada vajalike Google APIde kasutamine. Selleks vali: `APIs & services`, `Dashboard`, 
lülita sisse `Google Sheets API`. Mõned API-d, nt `Mail` (e-kirja saatmine) on vaikimisi sisse lülitatud.
- ___klientrakendusele kredentsiaalide moodustamine___. seejärel kasuta pilveplatvormi projekti klientrakendus(te)le kredentsiaalide moodustamiseks. Selleks vali `APIs & services`, `Credentials`.
- vaikimisi on loodud kredentsiaal nimega `Apps Script`. Seda kasutab töölehe projekt ise pilveplatvormi projektiga suhtlemiseks. Ära seda puutu.
- loo uus kredentsiaal oma sirvikurakendusele: `Create credentials`, `OAuth Client ID`, `Web application`. Sirvikrakendusele vali sobiv nimi: `Sonarakendus`.
- Näita allikdomeen (_Authorized Javascript origins_), kust pöördumisi lubatakse:  `https://agiil.github.io`. Pöördumiste piiramine on vajalik, sest igalt poolt pöördumise lubamine nõuaks rakenduse läbivaatamist Google poolt.
- kopeeri moodustatud `client ID` - `838912361532-9utpihfcsrqn8e8o9gsg3ag1i0g8i7df.apps.googleusercontent.com`
- moodustati ka `client secret`. Seda pole praegu vaja.

`doGet()`
- on Google Apps Script funktsioon, mis töötleb `HTTP GET` päringu arvutuslehe poole
- tagastab kõik arvutuslehel salvestatud sõnakirjed
- kujul `{"Kirjed":[{"Kirje":"..."},{"Kirje":"..."}]}`

Autentimine
- Google Sign-In abil
- Identsustõendi näide:

````
{
 "azp": "838912361532-9utpihfcsrqn8e8o9gsg3ag1i0g8i7df.apps.googleusercontent.com",
 "aud": "838912361532-9utpihfcsrqn8e8o9gsg3ag1i0g8i7df.apps.googleusercontent.com",
 "sub": "105983716899427159097",
 "email": "priit.parmakson@gmail.com",
 "email_verified": "true",
 "at_hash": "mThpUP54kBpSg4ylicEWmA",
 "iss": "accounts.google.com",
 "jti": "2ccd8153c626ec3e3a07142c59eca13f9319decc",
 "iat": "1514424869",
 "exp": "1514428469",
 "name": "Priit Parmakson",
 "picture": "https://lh6.googleusercontent.com/-NbBrelgmGkA/AAAAAAAAAAI/AAAAAAAAAAA/AFiYof2NA7ULqGay36cWEJe-RzdZuxbG8g/s96-c/photo.jpg",
 "given_name": "Priit",
 "family_name": "Parmakson",
 "locale": "en-FI",
 "alg": "RS256",
 "kid": "09e58393e68b2a2a6c866bc9862ee53d2170863a"
}
````
