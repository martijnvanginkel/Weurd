document.querySelector('#add_word_btn').addEventListener('click', () => {
    const parent = document.querySelector('form');
    const input = document.createElement('div');
    const add_button = document.querySelector('#add_word_btn');

    input.className = 'word_field';
    input.innerHTML = `
        <label>langOne</label>
        <input type="text" name="langOne">
        <label>langTwo</label>
        <input type="text" name="langTwo">
        <button type="button" class="remove_word_btn">X</button>
    `;

    input.querySelector('.remove_word_btn').addEventListener('click', e => e.target.parentElement.remove());
    parent.insertBefore(input, add_button);
});
