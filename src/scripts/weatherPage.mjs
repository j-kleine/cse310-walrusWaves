import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";
import { getSavedLocation, displaySavedLocation, setSavedLocation } from "./utils.mjs";

// Function to create the weather page content, returning a string of HTML that will be inserted into the main element of the page
// The HTML includes a select dropdown for choosing a location, a weather widget box with air and water temperature, and a weather info container with additional information
// The weather widget box includes labels for air and water, values for temperature, and units for temperature
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

// Function to render the weather page
// This function sets the document title, clears the main content, and populates it with the weather page content
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

// Function to load the weather page
// This function adds an event listener to the weather icon in the bottom menu bar
export function loadWeatherPage() {
    // add eventlistener 'click' to weather icon
    document.querySelector('#weather').addEventListener('click', () => {
        renderWeatherPage();
        // page reload to refresh API data, and if no saved location found automatically return to home page
        window.location.reload();
    })
}