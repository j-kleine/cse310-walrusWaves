import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";
import { getSavedLocation, displaySavedLocation, setSavedLocation } from "./utils.mjs";
import { displayStoredUnitChoice, storeUnit } from "./unitSwitcher.mjs";

// Function to create the settings page content, returning a string of HTML that will be inserted into the main element of the page
function settingsPageContent() {
    return `
    <div id="location-seeker" class="weather-location-seeker">
        <label>
            <select name="" id="plunge-select" class="settings-plunge-select" title="Find your plunge location!">
            <option class="option-disabled" value="" disabled="" selected="">Find your location!</option>
            <option value="Espergærde">Espergærde</option>
            <option value="Jammerbugten">Jammerbugten</option>
            <option value="Schausende">Schausende</option>
            </select>
        </label>
    </div>
    <h3 class="settings-heading">Settings</h3>
    <h4 class="settings-subheading">Units</h4>
    <div id="settings-container">
        <div id="change-temp">
            <span class="settings-unit-desc">Temperature</span>
            <div class="settings-unit-value">
                <span id="settings-temp-c" class="metric">°C</span>
                <span class="vertical-divider">/</span>
                <span id="settings-temp-f" class="imperial">°F</span>
            </div>
        </div>
        <div id="change-speed">
            <span class="settings-unit-desc">Speed</span>
            <div class="settings-unit-value">
                <span id="settings-speed-kmh" class="metric">kmh</span>
                <span class="vertical-divider">/</span>
                <span id="settings-speed-mph" class="imperial">mph</span>
            </div>
        </div>
    </div>
    <div id="impressum">
        <span id="about-link">About</span>
    </div>
    <div id="impressum-popup"></div>
    `
}

// Function to create the impressum content, returning a string of HTML that will be inserted into the impressum popup
// The HTML includes a message with the year and the author's name, as well as attributions for fonts, menu icons, and the background image
function impressumContent() {
    return `
    <div id="impressum-message">
        <span class="impressum-bold">@2025 walrusWaves</span>
        <span>Joschua Kleine</span>
    </div>
    <div id="attributions-message">
        <span><span class="impressum-bold">Fonts </span>by Google API</span>
        <span><span class="impressum-bold">Menu Icons </span>by Microsoft</span>
        <span><span class="impressum-bold">Image </span>by Matt Hardy via Pexels</span>
    </div>
    <span id="close-impressum">Close</span>
    `
}

// Function to render the settings page, setting the document title, clearing the main content, and then populates it with the settings page content
function renderImpressum() {
    // add eventlistener 'click' to about button
    document.querySelector('#about-link').addEventListener('click', () => {
        // hide impressum popup
        document.querySelector('#impressum-popup').style.display = "none";
        removePageContent('#impressum-popup');

        // call impressumContent function to populate impressum popup
        document.querySelector('#impressum-popup').insertAdjacentHTML('afterbegin', impressumContent());
        document.querySelector('#impressum-popup').style.display = "flex";
        
        // console.log(impressumContent());

        // add eventlistener 'click' to close impressum button
        document.querySelector('#close-impressum').addEventListener('click', () => {
            // empty out impressum popup to close
            document.querySelector('#impressum-popup').style.display = "none";
            removePageContent('#impressum-popup');
        })
    })
}

// Function to render the settings page
function renderSettingsPage() {
    // set document title to '... Settings'
    document.title = 'walrusWaves | Settings';

    // empty out main to prepare for reload
    removePageContent('main');

    // call homePageContent function to populate <main>
    document.querySelector('main').insertAdjacentHTML('afterbegin', settingsPageContent());

    // add active circle to home and remove other two in bottom menubar
    switchActiveMenuIcon('#settings', '#home', '#weather');

    const selectedLocation = getSavedLocation();
    displaySavedLocation(selectedLocation);
    setSavedLocation();
    
    renderImpressum();

    displayStoredUnitChoice('settings-temp', '#settings-temp-f', '#settings-temp-c');
    displayStoredUnitChoice('settings-speed', '#settings-speed-mph', '#settings-speed-kmh');

    storeUnit('settings-temp', '#settings-temp-c', '#settings-temp-f');
    storeUnit('settings-temp', '#settings-temp-f', '#settings-temp-c');
    storeUnit('settings-speed', '#settings-speed-kmh', '#settings-speed-mph');
    storeUnit('settings-speed', '#settings-speed-mph', '#settings-speed-kmh');

}

// Function to load the settings page
// This function adds an event listener to the settings icon in the bottom menu bar
export function loadSettingsPage() {
    // add eventlistener 'click' to settings icon
    document.querySelector('#settings').addEventListener('click', () => {
        renderSettingsPage();
    })
}