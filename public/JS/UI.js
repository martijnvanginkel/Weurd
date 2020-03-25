
document.querySelector('#add_word_btn').addEventListener('click', () => {

    createWordFieldElement();
    // const parent = document.querySelector('form');
    // const input = document.createElement('div');
    // const save_button = document.querySelector('#save_list_btn');

    // input.className = 'word_field';
    // input.innerHTML = `
    //     <label>langOne</label>
    //     <input type="text" name="langOne">
    //     <label>langTwo</label>
    //     <input type="text" name="langTwo">
    //     <button type="button" class="remove_word_btn">X</button>
    // `;
    // input.querySelector('.remove_word_btn').addEventListener('click', e => e.target.parentElement.remove());
    // parent.insertBefore(input, save_button);
});

document.querySelector('#save_list_btn').addEventListener('submit', (e) => {
    e.preventDefault();
})

const buttons = document.querySelectorAll('.remove_word_btn')
    for (const button of buttons) {
    button.addEventListener('click', function(e) {
        e.target.parentElement.remove();
        console.log('delete row');
    })
}

// document.querySelectorAll('.remove_word_btn').addEventListener('click', (e) => {
//     console.log('delete row');
//     e.preventDefault();
//     e.target.parentElement.remove();
// });

function addEvent () {
    const input = document.createElement('div');
    input.querySelector('.remove_word_btn').addEventListener('click', e => e.target.parentElement.remove());  
}

function createWordFieldElement () {
    const parent = document.querySelector('form');
    const input = document.createElement('div');
    const save_button = document.querySelector('#save_list_btn');

    input.className = 'word_field';
    input.innerHTML = `
        <label>langOne</label>
        <input type="text" name="langOne" value="">
        <label>langTwo</label>
        <input type="text" name="langTwo" value="">
        <button type="button" class="remove_word_btn">X</button>
    `;
    input.querySelector('.remove_word_btn').addEventListener('click', e => e.target.parentElement.remove());
    parent.insertBefore(input, save_button);
}
