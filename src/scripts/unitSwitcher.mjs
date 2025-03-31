import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

export function initialUnitSetting() {
    checkStoredUnit('settings-temp');
    checkStoredUnit('settings-speed');
    checkStoredUnit('settings-length');
}

export function displayStoredUnitChoice(unitKey, imperial, metric) {
    const unit = getLocalStorage(unitKey);
    if (unit == 'imperial') {
        console.log(unitKey + ' ' + unit);
        document.querySelector(imperial).classList.add('settings-active');
    } else {
        document.querySelector(metric).classList.add('settings-active');
        // console.log(unitKey + ' ' + unit);
    }
}

export function storeUnit(key, activate, deactivate) {
    document.querySelector(activate).addEventListener('click', () => {
        const classUnit = document.querySelector(activate).classList[0];
        setLocalStorage(key, classUnit);
        document.querySelector(activate).classList.add('settings-active');
        document.querySelector(deactivate).classList.remove('settings-active');

    })
}