

if (document.querySelector('#add_word_btn') !== null) {    
    document.querySelector('#add_word_btn').addEventListener('click', () => {
        const parent = document.querySelector('form');
        const save_button = document.querySelector('#insert_before');
        
        for (let index = 0; index < 3; index++) {
            const input = document.createElement('div');
            input.className = 'word_field';
            input.innerHTML = `
                <label>langOne</label>
                <input type="text" name="langOne">
                <label>langTwo</label>
                <input type="text" name="langTwo" class="second_field">
                <button type="button" class="remove_word_btn">X</button>
            `;
            input.querySelector('.remove_word_btn').addEventListener('click', e => { 

                
                // const according_field = e.target.parentElement.querySelector('.second_field');

                // // console.log(according_field);
                // if (according_field.id === 'last_field') {
                console.log('click here');
                e.preventDefault();

                    e.target.parentElement.remove()
                    
                //     const second_fields = document.querySelectorAll('.second_field');
                //     const last_field = second_fields[second_fields.length - 1];
                //     last_field.id = 'last_field';
                //     last_field.onkeyup = (e) => {
                //         console.log('asdf');
                //     }
                //     console.log(last_field)

                // } else {
                //     e.target.parentElement.remove()
                // }

            }); 


            parent.insertBefore(input, save_button);

            // if (index === 2) {

            //     const last_last_field = document.querySelector('#last_field');
            //     if (last_last_field !== null) {
            //         last_last_field.onkeyup = null;
            //     }

            //     last_word_field = input.querySelector('.second_field');
            //     last_word_field.id = 'last_field';
            //     last_word_field.onkeyup = (e) => {
            //         console.log('asdf');
            //     }
            //     console.log(last_word_field)
            // }
        }
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
        // console.log('remove')
        const list_id = e.target.value;
        fetch(`http://localhost:5000/api/lists/${list_id}`, {
            method: 'DELETE',
        })
        .then(response => response.json()).then(response => {
            e.target.parentElement.remove();
        }).catch(() => { })
    });
}
