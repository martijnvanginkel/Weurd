const flickEmptyField = (input_field) => {
    input_field.classList.add('yellow_alert');
    setTimeout(() => {
        input_field.classList.remove('yellow_alert');
        input_field.select();
    }, 300)
}

function timeout() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

const flickWrongField = async (input_field) => {
    // cheat_div.innerHTML = answer;//new_word.old_answer;
    input_field.classList.add('red_alert');

    

    await timeout(() => {

    });
    input_field.classList.remove('red_alert');
    input_field.select();
    // setTimeout(() => {
        //answer_input.value = '';
        // cheat_div.innerHTML = '';
        //callback();
    // }, 1000)
}


const checkForWrongAnswer = async (input, new_word, callback) => {
    const cheat_div = document.querySelector('#cheat_div');

    if (new_word.old_passed === false) {
        
        // cheat_div.innerHTML = new_word.old_answer;
        console.log(cheat_div)
        console.log(new_word)
        cheat_div.innerHTML = new_word.old_answer;
        await flickWrongField(input);
        cheat_div.innerHTML = '';
        console.log('didnt pass');
    }
    callback();

}

// const setupNewWord = (answer_input, new_word, word_id) => {
//     const answer_label = document.querySelector('#answer_label');

//     answer_label.innerHTML = new_word.new_word.word.langOne;
//     word_id.value = new_word.new_word.word._id;
//     answer_input.value = '';
//     answer_input.select();
// }


document.querySelector('#next_btn').addEventListener('click', (e) => {
    const game_id = document.querySelector('#game_id');
    const word_id = document.querySelector('#word_id');
    const answer_label = document.querySelector('#answer_label');
    const answer_input = document.querySelector('#answer_input');
    // const cheat_div = document.querySelector('#cheat_div');

    // Flick empty answer_input
    if (answer_input.value == '')
    {
        flickEmptyField(answer_input);
        return ;
    }

    fetch(`http://localhost:5000/api/games/update/${game_id.value}/word/${word_id.value}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({ answer: answer_input.value })
    }).then(response =>  {
        return response.json()
    })
    .then( (new_word) => {

        // if (new_word.old_passed === false) {

        //     // cheat_div.innerHTML = new_word.old_answer;

        //     flickWrongField(answer_input, cheat_div, new_word.old_answer);

        //     console.log('didnt pass');
        // }
        checkForWrongAnswer(answer_input, new_word, function() {
            console.log('callack');
            answer_label.innerHTML = new_word.new_word.word.langOne;
            word_id.value = new_word.new_word.word._id;
            answer_input.value = '';
            answer_input.select();
        });

        
        // answer_label.innerHTML = new_word.new_word.word.langOne;
        // word_id.value = new_word.new_word.word._id;
        // answer_input.value = '';
        // answer_input.select();


    }).catch(() => window.location.href = `http://localhost:5000/games/results/${game_id.value}`);
});

document.querySelector('#answer_input').onkeyup = (e) => {
    if (e.keyCode === 13) {
        const next_btn = document.querySelector('#next_btn');
        next_btn.click();
    }
}

