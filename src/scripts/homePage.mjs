import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";
import { getSavedLocation, displaySavedLocation, setSavedLocation } from "./utils.mjs";

// Function to create the home page content, returning a string of HTML that will be inserted into the main element of the page
// The HTML includes a heading and a select dropdown for choosing a location
function homePageContent() {
    return `
    <h2 class="home-hero"><span>Plunge</span><span>With</span><span>Purpose</span></h2>
    <div id="location-seeker" class="home-location-seeker">
        <label>
            <select name="" id="plunge-select" class="home-plunge-select" title="Find your plunge location!">
                <option class="option-disabled" value="" disabled="" selected="">Find your location!</option>
                <option value="Espergærde">Espergærde</option>
                <option value="Jammerbugten">Jammerbugten</option>
                <option value="Schausende">Schausende</option>
            </select>
        </label>
    </div>
    `
}

// Function to render the home page
// This function sets the document title, clears the main content, and populates it with the home page content
export function renderHomePage() {
    // set document title to '... Home'
    document.title = 'walrusWaves | Home';
    
    // empty out main to prepare for reload
    removePageContent('main');

    // call homePageContent function to populate <main>
    document.querySelector('main').insertAdjacentHTML('afterbegin', homePageContent());

    // add active circle to home and remove other two in bottom menubar
    switchActiveMenuIcon('#home', '#weather', '#settings');

    const selectedLocation = getSavedLocation();
    displaySavedLocation(selectedLocation);
    setSavedLocation(selectedLocation);
}

// Function to load the home page
// This function adds an event listener to the home icon in the bottom menu bar
export function loadHomePage() {
    // add eventlistener 'click' to home icon
    document.querySelector('#home').addEventListener('click', () => {
        // clear localStorage when Home is clicked -> no saved location for future website loads
        localStorage.removeItem('select-location');
        renderHomePage();
    })
}