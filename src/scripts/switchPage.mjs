export function removePageContent(selector) {
    const parent = document.querySelector(selector);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function switchActiveMenuIcon(add, del1, del2) {
    document.querySelector(del1).classList.remove('active-page');
    document.querySelector(del2).classList.remove('active-page');
    document.querySelector(add).classList.add('active-page');
}