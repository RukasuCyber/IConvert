//menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

//inverse money
function change() {
  const money1 = document.querySelector(".money1");
  const money2 = document.querySelector(".money2");
  const amount = document.querySelector(".amount");
  const convertResult = document.querySelector(".convertresult");

  if (money1 && money2) {
    const tempValue = money1.value;
    money1.value = money2.value;
    money2.value = tempValue;
  } else {
    console.error("Les éléments money1 et money2 n'ont pas été trouvés.");
  }
  if (amount && convertResult) {
    const tempValue = amount.value;
    amount.value = convertResult.value;
    convertResult.value = tempValue;
  } else {
    console.error("Les éléments amount et convertresult n'ont pas été trouvés.");
  }
}

const DEVISES = {

}

const data = `
  <gesmes:Envelope>
  <gesmes:subject>Reference rates</gesmes:subject>
  <gesmes:Sender>
  <gesmes:name>European Central Bank</gesmes:name>
  </gesmes:Sender>
  <Cube>
    <Cube time="2020-08-03">
      <Cube currency="USD" rate="1.1726"/>
      <Cube currency="JPY" rate="124.51"/>
      <Cube currency="BGN" rate="1.9558"/>
      <Cube currency="CZK" rate="26.319"/>
      <Cube currency="DKK" rate="7.4466"/>
      <Cube currency="GBP" rate="0.90013"/>
      <Cube currency="HUF" rate="345.72"/>
      <Cube currency="PLN" rate="4.4201"/>
      <Cube currency="RON" rate="4.8355"/>
      <Cube currency="SEK" rate="10.2958"/>
      <Cube currency="CHF" rate="1.0784"/>
      <Cube currency="ISK" rate="160.00"/>
      <Cube currency="NOK" rate="10.7188"/>
      <Cube currency="HRK" rate="7.4755"/>
      <Cube currency="RUB" rate="86.6018"/>
      <Cube currency="TRY" rate="8.1864"/>
      <Cube currency="AUD" rate="1.6508"/>
      <Cube currency="BRL" rate="6.1375"/>
      <Cube currency="CAD" rate="1.5755"/>
      <Cube currency="CNY" rate="8.1900"/>
      <Cube currency="HKD" rate="9.0882"/>
      <Cube currency="IDR" rate="17254.00"/>
      <Cube currency="ILS" rate="4.0056"/>
      <Cube currency="INR" rate="88.1805"/>
      <Cube currency="KRW" rate="1401.26"/>
      <Cube currency="MXN" rate="26.2690"/>
      <Cube currency="MYR" rate="4.9501"/>
      <Cube currency="NZD" rate="1.7701"/>
      <Cube currency="PHP" rate="57.579"/>
      <Cube currency="SGD" rate="1.6147"/>
      <Cube currency="THB" rate="36.644"/>
      <Cube currency="ZAR" rate="20.2777"/>
    </Cube>
  </Cube>
  </gesmes:Envelope>
`
const chargerData = () => {
  const BEACON_CUBE = '<Cube>'
  const positionBeaconCubeStart = data.indexOf(BEACON_CUBE)
  //console.log(positionBeaconCubeStart)
  const BEACON_CUBE_END = '</Cube>'
  const positionBeaconCubeEnd = data.lastIndexOf(BEACON_CUBE_END)
  //console.log(positionBeaconCubeEnd)
  const SIZE_BEACON_CUBE_END = BEACON_CUBE_END.length
  const dataXML = data.substring(positionBeaconCubeStart, positionBeaconCubeEnd + SIZE_BEACON_CUBE_END)
  //console.log(dataXML)

  const parser = new DOMParser()
  const mimeTypeXML = 'text/xml'

  const documentXML = parser.parseFromString(dataXML, mimeTypeXML)
  console.log(documentXML)

  const cube1 = documentXML.firstElementChild
  console.log(cube1)

  const cube2 = cube1.firstElementChild
  console.log(cube2)
  console.log(cube2.attributes)

  const cubeAttributs = cube2.attributes

  const attrTime = cubeAttributs.getNamedItem('time')
  console.log(attrTime)

  const time = attrTime.value
  console.log(time)

  const timeElement = document.getElementById('time')
  timeElement.textContent = `Date des cours: ${time}`

  const elements = cube2.children
  console.log(elements)

  for (const element of elements){
    const attributs = element.attributes
    const currencyText = attributs.getNamedItem('currency').value
    const rateText = attributs.getNamedItem('rate').value
    
    const money = currencyText.toLowerCase()
    const taux = parseFloat(rateText)

    DEVISES[money] = taux
  }
  console.log(DEVISES) 
}

chargerData()



//convert
const eurgbpInput = document.getElementById('input-eurgbp');
const gbpeurInput = document.getElementById('input-gbpeur');

gbpeurInput.value = DEVISES.gbp.toFixed(5)

eurgbpInput.addEventListener('input',()=>{
  const eur = eurgbpInput.value
  const eurNombre = parseFloat(eur)

  const nouvelleConversion = eurNombre * DEVISES.gbp
  const nouvelleConversionText = nouvelleConversion.toFixed(5)
  gbpeurInput.value = nouvelleConversionText
})

gbpeurInput.addEventListener('input', () => {
  const gbp = gbpeurInput.value
  const gbpNombre = parseFloat(gbp)
  
  const nouvelleConversion = gbpNombre / DEVISES.gbp
  const nouvelleConversionText = nouvelleConversion.toFixed(5)
  eurgbpInput.value = nouvelleConversionText
})

