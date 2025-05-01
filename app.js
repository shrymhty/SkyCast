const searchBtn = document.getElementById('search-svg');
const searchInput = document.getElementById('search-input');

const apiKey = "a56e8397093f1171ac58a751313ec612 ";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

let cityName = "";

const weatherIcons = {
    "clear sky": "icons/clear-day.svg",
    "scattered clouds": "icons/partly-cloudy-day.svg",
    "broken clouds": "icons/overcast.svg",
    "rain": "icons/rain.svg",
    "thunderstorm": "icons/thunderstorm.svg",
    "snow": "icons/snow.svg",
    "overcast clouds": 'icons/overcast.svg'
};
  

const countryCodeMap = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AO: "Angola",
    AR: "Argentina",
    AM: "Armenia",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BD: "Bangladesh",
    BY: "Belarus",
    BE: "Belgium",
    BJ: "Benin",
    BO: "Bolivia",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BR: "Brazil",
    BG: "Bulgaria",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CL: "Chile",
    CN: "China",
    CO: "Colombia",
    CD: "DRC",
    CR: "Costa Rica",
    HR: "Croatia",
    CZ: "Czech Republic",
    DK: "Denmark",
    EG: "Egypt",
    EE: "Estonia",
    ET: "Ethiopia",
    FI: "Finland",
    FR: "France",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GR: "Greece",
    GT: "Guatemala",
    HT: "Haiti",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Iraq",
    IE: "Ireland",
    IL: "Israel",
    IT: "Italy",
    CI: "Ivory Coast",
    JP: "Japan",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KR: "South Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Laos",
    LV: "Latvia",
    LB: "Lebanon",
    LR: "Liberia",
    LT: "Lithuania",
    LU: "Luxembourg",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    ML: "Mali",
    MX: "Mexico",
    MD: "Moldova",
    MN: "Mongolia",
    ME: "Montenegro",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NP: "Nepal",
    NL: "Netherlands",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    MK: "North Macedonia",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PA: "Panama",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PL: "Poland",
    PT: "Portugal",
    QA: "Qatar",
    RO: "Romania",
    RU: "Russia",
    RW: "Rwanda",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SG: "Singapore",
    SK: "Slovakia",
    SI: "Slovenia",
    SO: "Somalia",
    ZA: "South Africa",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syria",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "UAE",
    GB: "UK",
    US: "USA",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VE: "Venezuela",
    VN: "Vietnam",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe"
};


// When search icon is clicked
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    searchInput.classList.toggle('show');
    if (searchInput.classList.contains('show')) {
        searchInput.style.display = 'block';
        searchInput.focus();
        searchBtn.style.display = 'none';
    } else {
        setTimeout(() => {
            searchInput.style.display = 'none';
        }, 300); 
    }
});

// When Enter is pressed inside input
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        searchInput.classList.remove('show');
        searchInput.style.display = 'none';
        searchBtn.style.display = 'block';

        // (Optional) — you can capture the searched city value
        cityName = searchInput.value;
        getWeatherStatus(cityName);
        searchInput.value = ''; // Clear the input
    }
});

async function getWeatherStatus(cityName) {
    const response = await fetch(apiUrl + `&q=${cityName}` + `&appid=${apiKey}`);
    var data = await response.json();
    updateOverview(data);
    updateWindStatus(data);
    updateHumidityStatus(data);
    updateSunTimes(data);
}

function updateOverview(data) {
    const description = document.getElementById('desc');
    const temp = document.getElementById('temp');
    const location = document.getElementById('location-name');
    const statusIcon = document.getElementById('status'); // the img element for the weather icon

    // Get the weather description
    const weatherDescription = data['weather'][0].description;
    
    // Set the description and temperature
    description.innerText = weatherDescription;
    temp.innerText = Math.round(data['main'].temp);
    location.innerText = `${data['name']}, ${countryCodeMap[data['sys'].country] || data['sys'].country}`;

    // Set the weather icon based on description
    if (weatherIcons[weatherDescription]) {
        statusIcon.src = weatherIcons[weatherDescription]; // Update the icon src
    } else {
        statusIcon.src = "icons/default.svg"; // Fallback icon in case of unknown weather type
    }

}

function updateWindStatus(data) {
    const speed = document.getElementById('speed');

    speed.innerText = data['wind'].speed;
}

function updateHumidityStatus(data) {
    const humidityValue = document.getElementById('humid');
    humidityValue.innerText = data['main'].humidity;
}

function updateSunTimes(data) {
    const sunrise = document.getElementById('sunrise-time');
    const sunset = document.getElementById('sunset-time');

    const sunriseTime = formatUTC(data['sys'].sunrise);
    const sunsetTime = formatUTC(data['sys'].sunset);

    sunrise.innerText = `${sunriseTime[3]}:${sunriseTime[4]} A.M`;
    sunset.innerText = `${sunsetTime[3]}:${sunsetTime[4]} P.M`
}

function formatUTC(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return [day, month, year, hours, minutes];
  }