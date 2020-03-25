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

const remove_buttons = document.querySelectorAll('.remove_word_btn')
for (const button of remove_buttons) {
    button.addEventListener('click', e => e.target.parentElement.remove());
}

const select_buttons = document.querySelectorAll('.select_item_btn');
select_buttons.forEach(button => button.addEventListener('click', (e) => {
    if (document.querySelector('.selected_item') !== null) {
        const parent = document.querySelector('.selected_item');
        console.log(parent);
        const child =  parent.querySelector('.select_item_btn');
        console.log(child);
        child.innerHTML = `unselected`;
       // parent.querySelector('.selected_item_btn').innerHTML = `selected`;
        // console.log(btn_child);
        parent.classList.remove('selected_item');
    }
    e.target.parentElement.classList.add('selected_item');
    e.target.innerHTML = `selected`;
}))

