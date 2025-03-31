import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";
import { getSavedLocation, displaySavedLocation, setSavedLocation } from "./utils.mjs";

function weatherPageContent() {
    return `
    <div id="location-seeker" class="weather-location-seeker">
        <label>
            <select name="" id="plunge-select" class="weather-plunge-select" title="Find your plunge location!">
                <option class="option-disabled" value="" disabled="" selected="">Your Location</option>
                <option value="Espergærde">Espergærde</option>
                <option value="Jammerbugten">Jammerbugten</option>
                <option value="Schausende">Schausende</option>
            </select>
        </label>
    </div>
    <div id="weather-widget-box">
        <div class="aw-box">
            <span class="aw-box-labels">AIR</span>
            <span id="air-temp-value" class="aw-box-values">--</span>
            <span class="aw-box-units air-temp-unit">--</span>
        </div>
        <div>
            <img id="weather-icon" src="" alt="">
        </div>
        <div class="aw-box">
            <span class="aw-box-labels">WATER</span>
            <span id="water-temp-value" class="aw-box-values">--</span>
            <span class="aw-box-units water-temp-unit">--</span>
        </div>
    </div>
    <div id="weather-info-container">
        <div id="no-scrollbar-container">
            <div><span class="weather-info-desc">Sunrise</span><span id="sunrise-time" class="weather-info-value">--</span></div>
            <div><span class="weather-info-desc">Sunset</span><span id="sunset-time" class="weather-info-value">--</span></div>
            <div><span class="weather-info-desc">Windspeed</span><span id="windspeed" class="weather-info-value">--</span></div>
            <div><span class="weather-info-desc">Direction</span><span id="wind-direction" class="weather-info-value">--</span></div>
            <div><span class="weather-info-desc">UV-Index</span><span id="uv-index" class="weather-info-value">--</span></div>
        </div>
    </div>
    `
}

export function renderWeatherPage() {
    // set document title to '... Weather'
    document.title = 'walrusWaves | Weather';
    
    // empty out main to prepare for reload
    removePageContent('main');

    // call homePageContent function to populate <main>
    document.querySelector('main').insertAdjacentHTML('afterbegin', weatherPageContent());

    // add active circle to home and remove other two in bottom menubar
    switchActiveMenuIcon('#weather', '#home', '#settings');

    const selectedLocation = getSavedLocation();
    displaySavedLocation(selectedLocation);
    setSavedLocation();
}

export function loadWeatherPage() {
    // add eventlistener 'click' to weather icon
    document.querySelector('#weather').addEventListener('click', () => {
        renderWeatherPage();
        // page reload to refresh API data, and if no saved location found automatically return to home page
        window.location.reload();
    })
}