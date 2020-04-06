class InputRow {
    constructor() {
        this.parent = this.createParent();
        this.first_field = this.createTextField('langOne', 'first_field', () => this.second_field.select());
        this.second_field = this.createTextField('langTwo', 'second_field', this.selectNextRow);
        this.remove_button = this.createRemoveBtn();
        this.next_row = null;
    }

    createParent() {
        const form = document.querySelector('form');
        const input = document.createElement('div');
        
        input.className = 'word_field';
        form.appendChild(input);
        return input;
    }

    selectNextRow(current_row) {
        if (current_row.next_row === null) {
            current_row.next_row = new InputRow();
        }
        current_row.next_row.first_field.select();
    }

    createTextField(name, class_name, addEvent) {
        const field = document.createElement('input');

        field.type = 'text';
        field.name = name;
        field.className = class_name;
        field.onkeydown = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                addEvent(this);
            }
        }
        this.parent.appendChild(field);
        return field;
    }

    createRemoveBtn() {
        const remove_button = document.createElement('button');

        remove_button.type = 'button';
        remove_button.className = 'remove_word_btn';
        remove_button.innerHTML = 'X';
        remove_button.addEventListener('click', e => {
            this.parent.remove();
            if (second_field.id === 'last_field') {
                setNewLastField(null);
            }
        })
        this.parent.appendChild(remove_button);
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

// const setNewLastField = (input) => {
//     let last_field;

//     if (input !== null) {
//         last_field = input.querySelector('.second_field');
//     }
//     else {
//         const fields = document.querySelectorAll('.second_field');
//         last_field = fields[fields.length - 1];
//     }
//     last_field.id = 'last_field';
//     // last_field.onkeyup = (e) => {
//     //     e.preventDefault();
//     //     if (e.keyCode === 13) {
//     //         createNewWordField();
//     //         // return false;
//     //         console.log('enter hit');
//     //     }
//     // }
//     console.log(input.querySelector('.first_field').select());
// }

// <input type="text" name="langOne" class="first_field">

const createNewWordField = () => {
    // const form = document.querySelector('form');
    // const insert_before = document.querySelector('#insert_before');
    

    const inputRow = new InputRow();

    // form.insertBefore(inputRow.parent, insert_before);
    //removeOldLastField();
    //setNewLastField(inputRow.parent);

}

if (document.querySelector('#add_word_btn') !== null) {    
    document.querySelector('#add_word_btn').addEventListener('click', () => {

        createNewWordField();

    });
}

// if (document.getElementById('save_list_btn') !== null) {
//     document.getElementById('save_list_btn').addEventListener('click', e => {

//     }) 
// }

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

// document.addEventListener("DOMContentLoaded", () => {
//     if (document.querySelector('.word_container') !== null) {
//         const fields = document.querySelectorAll('.word_field');
//         if (fields !== null) {
//             setNewLastField(fields[fields.length - 1]);
//         }
//     }
// });
