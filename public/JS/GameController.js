const waitForTimer = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const flickInputField = async (field, color, time) => {
    field.classList.add(`${color}_alert`);
    await waitForTimer(time);
    field.classList.remove(`${color}_alert`);
    field.select();
}

const setupNextWord = (answer_input, new_word, word_id) => {
    const answer_label = document.querySelector('#answer_label');

    answer_label.innerHTML = new_word.new_word.word.langOne;
    word_id.value = new_word.new_word.word._id;
    answer_input.value = '';
    answer_input.select();
}

const checkForWrongAnswer = async (input, new_word, word_id, callback) => {
    const cheat_div = document.querySelector('#cheat_div');

    if (new_word.old_answer_passed === false) {
        
        cheat_div.innerHTML = new_word.old_answer;
        await flickInputField(input, 'red', 1500);
        cheat_div.innerHTML = '';
    }
    callback(input, new_word, word_id);
}

document.querySelector('#next_btn').addEventListener('click', (e) => {
    const game_id = document.querySelector('#game_id');
    const word_id = document.querySelector('#word_id');
    const input_field = document.querySelector('#answer_input');

    if (input_field.value == '') {
        flickInputField(input_field, 'yellow', 500);
        return ;
    }

    fetch(`http://localhost:5000/api/games/update/${game_id.value}/word/${word_id.value}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({ answer: input_field.value })
    }).then(response => response.json()).then((new_word) => {
        checkForWrongAnswer(input_field, new_word, word_id, setupNextWord);
    }).catch(() => window.location.href = `http://localhost:5000/games/results/${game_id.value}`);
});

document.querySelector('#answer_input').onkeyup = (e) => {
    if (e.keyCode === 13) {
        const next_btn = document.querySelector('#next_btn');
        next_btn.click();
    }
}

document.addEventListener("DOMContentLoaded", () => document.querySelector('#answer_input').select());

