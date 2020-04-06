class InputRow {
    constructor() {
        this.first_field = this.createFirstField();
        this.second_field = this.createSecondField();
        this.remove_button = this.createRemoveBtn();
        this.parent = this.createParent();
        // console.log('asdf');
    }

    createParent() {
        const input = document.createElement('div');
        
        input.className = 'word_field';
        // input.innerHTML = `
        //     <button type="button" class="remove_word_btn">X</button>
        // `;
        input.appendChild(this.first_field);
        input.appendChild(this.second_field);
        input.appendChild(this.remove_button);
        console.log(input);
        return input;
    }

    createFirstField() {
        console.log('asdf');
        const first_field = document.createElement('input');

        first_field.type = 'text';
        first_field.className = 'first_field';
        first_field.name = 'langOne';
        return first_field;
    }

    createSecondField() {
        const second_field = document.createElement('input');
        second_field.type = 'text';
        second_field.className = 'second_field';
        second_field.name = 'langTwo';
        second_field.onkeydown = (e) => {
            if (e.keyCode === 13)
                e.preventDefault();
        }
        return second_field;
    }

    createRemoveBtn() {
        const remove_button = document.createElement('button');
        remove_button.type = 'button';
        remove_button.className = 'remove_word_btn';
        remove_button.innerHTML = 'X';
        remove_button.addEventListener('click', e => {
            input.remove();
            if (second_field.id === 'last_field') {
                setNewLastField(null);
            }
        })
        return remove_button;
    }


}

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
        if (e.keyCode === 13) {
            createNewWordField();
            // return false;
            console.log('enter hit');
        }
    }
    console.log(input.querySelector('.first_field').select());
}

// <input type="text" name="langOne" class="first_field">

const createNewWordField = () => {
    const form = document.querySelector('form');
    const insert_before = document.querySelector('#insert_before');
    

    const inputRow = new InputRow();

    form.insertBefore(inputRow.parent, insert_before);
    removeOldLastField();
    setNewLastField(inputRow.parent);

}

if (document.querySelector('#add_word_btn') !== null) {    
    document.querySelector('#add_word_btn').addEventListener('click', () => {

        createNewWordField();

    });
}

if (document.getElementById('save_list_btn') !== null) {
    document.getElementById('save_list_btn').addEventListener('click', e => {

    }) 
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
