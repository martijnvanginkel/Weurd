const all_row_instances = [];

class InputRow {
    constructor(first_value, second_value) {
        this.parent = this.createParent();
        this.first_field = this.createTextField('langOne', 'first_field', first_value, () => this.second_field.select());
        this.second_field = this.createTextField('langTwo', 'second_field', second_value, this.selectNextRow);
        this.remove_button = this.createRemoveBtn();
        this.next_row = null;
        this.addToList();
    }

    addToList() {
        all_row_instances.push(this);
        if (all_row_instances.length > 1) {
            all_row_instances[all_row_instances.length - 2].next_row = this;
        }
    }

    removeFromList() {
        all_row_instances.splice(this);
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

    createTextField(name, class_name, value, addEvent) {
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
        value === undefined ? field.value = '' : field.value = value;
        this.parent.appendChild(field);
        return field;
    }

    createRemoveBtn() {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'remove_word_btn';
        button.innerHTML = 'X';
        button.addEventListener('click', e => {
            e.preventDefault();
            for (let i = 0; i < all_row_instances.length; i++) {
                if (all_row_instances[i] == this) {
                    if (all_row_instances[i - 1] !== undefined && all_row_instances[i + 1] !== undefined) {
                        all_row_instances[i - 1].next_row = all_row_instances[i + 1];
                    }
                    all_row_instances.splice(i, 1);
                }
            }
            e.target.parentElement.remove();
        })
        this.parent.appendChild(button);
        return button;
    }
}

const checkForEmptyList = () => {
    document.querySelector('#save_list_btn').addEventListener('click', (e) => {
        for (let i = 0; i < all_row_instances.length; i++) {
            if (all_row_instances[i].first_field.value !== '' && all_row_instances[i].second_field.value !== '') {
                return ;
            }
        }
        e.preventDefault();
    });
}

if (document.querySelector('#save_list_btn') !== null) {
    checkForEmptyList();
}


if (document.querySelector('#add_word_btn') !== null) {    
    document.querySelector('#add_word_btn').addEventListener('click', () => {
        new InputRow();
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

export default InputRow
