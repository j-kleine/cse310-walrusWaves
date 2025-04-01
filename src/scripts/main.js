import { loadHomePage, renderHomePage } from "./homePage.mjs";
import { loadWeatherPage } from "./weatherPage.mjs";
import { loadSettingsPage } from "./settingsPage.mjs";
import { initialUnitSetting } from "./unitSwitcher.mjs";
import { countdown } from "./recursion-demo.mjs";

document.querySelector('main').addEventListener("load", renderHomePage());

loadHomePage();
loadWeatherPage();
loadSettingsPage();

initialUnitSetting();

// Example of using the countdown function
countdown(5); // Start the countdown from 5