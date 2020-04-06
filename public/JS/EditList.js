import InputRow from '/JS/UI.js'

document.addEventListener("DOMContentLoaded", () => {
    const list_element = document.querySelector('#list_id');
    const list_id = list_element.value;

    list_element.remove();
    fetch(`http://localhost:5000/api/lists/${list_id}`, {
        method: 'GET',
    })
    .then(response => response.json()).then(response => {
        response.words.forEach((word) => new InputRow(word.langOne, word.langTwo));
    }).catch(() => { });
});