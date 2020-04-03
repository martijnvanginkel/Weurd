if (document.querySelector('#add_word_btn') !== null) {    
    document.querySelector('#add_word_btn').addEventListener('click', () => {
        const parent = document.querySelector('form');
        const input = document.createElement('div');
        const save_button = document.querySelector('#save_list_btn');

        input.className = 'word_field';
        input.innerHTML = `
            <label>langOne</label>
            <input type="text" name="langOne">
            <label>langTwo</label>
            <input type="text" name="langTwo">
            <button type="button" class="remove_word_btn">X</button>
        `;
        input.querySelector('.remove_word_btn').addEventListener('click', e => e.target.parentElement.remove());
        parent.insertBefore(input, save_button);
    });
}

const remove_word_btns = document.querySelectorAll('.remove_word_btn')
for (const button of remove_word_btns) {
    button.addEventListener('click', e => e.target.parentElement.remove());
}

const remove_list_btns = document.querySelectorAll('.remove_list_btn')
for (const button of remove_list_btns) {
    button.addEventListener('click', e => {
        const list_id = e.target.value;
        fetch(`http://localhost:5000/api/lists/${list_id}`, {
            method: 'DELETE',
        })
        .then(response => response.json()).then(response => {
            e.target.parentElement.remove();
        }).catch(() => { })
    });
}
