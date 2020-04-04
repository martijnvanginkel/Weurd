const removeOldLastField = () => {
    const field = document.querySelector('#last_field');

    if (field !== null) {
        field.id = '';
        field.onkeyup = null;
    }
}

const setNewLastField = (input) => {
    let last_field;

    if (input !== null) {
        last_field = input.querySelector('.second_field');
    }
    else {
        const fields = document.querySelectorAll('.second_field');
        last_field = fields[fields.length - 1];
    }
    last_field.id = 'last_field';
    last_field.onkeyup = (e) => {
        e.preventDefault();
        if (e.keyCode === 9) {
            console.log('enter hit');
        }
        console.log('key up');
    }
}

if (document.querySelector('#add_word_btn') !== null) {    
    document.querySelector('#add_word_btn').addEventListener('click', () => {
        const parent = document.querySelector('form');
        const save_button = document.querySelector('#insert_before');
        
        for (let index = 0; index < 3; index++) {
            const input = document.createElement('div');
            input.className = 'word_field';
            input.innerHTML = `
                <label>langOne</label>
                <input type="text" name="langOne" class="first_field">
                <label>langTwo</label>
                <input type="text" name="langTwo" class="second_field">
                <button type="button" class="remove_word_btn">X</button>
            `;
            input.querySelector('.remove_word_btn').addEventListener('click', e => {
                if (input.querySelector('.second_field').id === 'last_field') {
                    e.target.parentElement.remove()
                    setNewLastField(null);
                }
            });
            // input.querySelector('.second_field').keydown = (e) => {
            //     e.preventDefault();
            //     if (e.keyCode === 13) {
            //         console.log('enter hit');
            //         return false;
            //     }
            // }

            parent.insertBefore(input, save_button);

            if (index === 2) {
                removeOldLastField();
                setNewLastField(input);
            }
        }
    });
}

if (document.getElementById('save_list_btn') !== null) {
    document.getElementById('save_list_btn').addEventListener('click', (e) => {
        console.log('save list');
        e.preventDefault();
    });
}

const remove_word_btns = document.querySelectorAll('.remove_word_btn')
for (const button of remove_word_btns) {
    button.addEventListener('click', e => {
        e.preventDefault();
        e.target.parentElement.remove();
    });  
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

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.word_container') !== null) {
        const fields = document.querySelectorAll('.word_field');
        if (fields !== null) {
            setNewLastField(fields[fields.length - 1]);
        }
    }
});
