const all_row_instances = [];

class InputRow {
    constructor() {
        this.parent = this.createParent();
        this.first_field = this.createTextField('langOne', 'first_field', () => this.second_field.select());
        this.second_field = this.createTextField('langTwo', 'second_field', this.selectNextRow);
        this.remove_button = this.createRemoveBtn();
        this.next_row = null;
        all_row_instances.push(this);
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

// const createNewWordField = () => {
//     // const form = document.querySelector('form');
//     // const insert_before = document.querySelector('#insert_before');
    

//     const inputRow = new InputRow();
//     // all_instances.push(inputRow);

//     // form.insertBefore(inputRow.parent, insert_before);
//     //removeOldLastField();
//     //setNewLastField(inputRow.parent);

// }

if (document.querySelector('#add_word_btn') !== null) {    
    document.querySelector('#add_word_btn').addEventListener('click', () => {
        const new_row = new InputRow();
        if (all_row_instances.length > 1) {
            all_row_instances[all_row_instances.length - 2].next_row = new_row;
        }
        all_row_instances.push(new_row);
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
