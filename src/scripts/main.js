import { loadHomePage, renderHomePage } from "./homePage.mjs";
import { loadWeatherPage } from "./weatherPage.mjs";
import { loadSettingsPage } from "./settingsPage.mjs";
import { initialUnitSetting } from "./unitSwitcher.mjs";
import { countdown } from "./recursion-demo.mjs";

// Call to load the home page
document.querySelector('main').addEventListener("load", renderHomePage());

// Call to load the different pages
loadHomePage();
loadWeatherPage();
loadSettingsPage();

// Call to load the unit setting function to set the initial units for the application
initialUnitSetting();

// Example of using the countdown function
countdown(5); // Start the countdown from 5