import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Function to check the stored unit in local storage
export function checkStoredUnit(unitKey) {
    const unit = getLocalStorage(unitKey);
    if (unit == 'imperial') {
        // console.log(unitKey + ': ' + unit);
        return unit
    } else {
        setLocalStorage(unitKey, 'metric')
        const unit = getLocalStorage(unitKey);
        // metric as standard
        // console.log(unitKey + ': ' + unit);
        return unit
    }
}

// Function to set the initial unit setting for the application
// This function checks the stored unit for temperature and speed in local storage
export function initialUnitSetting() {
    checkStoredUnit('settings-temp');
    checkStoredUnit('settings-speed');
}

// Function to display the stored unit choice in the settings page
// This function checks the stored unit in local storage and adds the 'settings-active' class to the corresponding element to highlight it and also removes the 'settings-active' class from the other element
export function displayStoredUnitChoice(unitKey, imperial, metric) {
    const unit = getLocalStorage(unitKey);
    if (unit == 'imperial') {
        // console.log(unitKey + ' ' + unit);
        document.querySelector(imperial).classList.add('settings-active');
    } else {
        document.querySelector(metric).classList.add('settings-active');
        // console.log(unitKey + ' ' + unit);
    }
}

// Function to store the unit choice in local storage
// This function adds an event listener to the specified element and when clicked, it sets the local storage with the selected unit and updates the class of the elements to highlight the active one
export function storeUnit(key, activate, deactivate) {
    document.querySelector(activate).addEventListener('click', () => {
        const classUnit = document.querySelector(activate).classList[0];
        setLocalStorage(key, classUnit);
        document.querySelector(activate).classList.add('settings-active');
        document.querySelector(deactivate).classList.remove('settings-active');

    })
}