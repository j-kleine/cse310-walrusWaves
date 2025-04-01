// Function to handle the switch between pages in the app
// This function is used to remove all child elements from a specified parent element
export function removePageContent(selector) {
    const parent = document.querySelector(selector);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Function to switch the active menu icon in the bottom menu bar
export function switchActiveMenuIcon(add, del1, del2) {
    document.querySelector(del1).classList.remove('active-page');
    document.querySelector(del2).classList.remove('active-page');
    document.querySelector(add).classList.add('active-page');
}