
const unpassedWords = value => {

    console.log(value.passed);
    if (value.passed === true) {
        return true;
    } else {
        return false;
    }
    // (value.passed === true)
}

const findNewWord = (words) => {

    const new_words = words;
    //console.log(words);

    //new_words.filter(unpassedWords);//forEach(word => {
    //     console.log(word.passed)
    // })
    // console.log(new_words);

    for (const word of new_words) {
        if (word.passed === false) {
            return word;
        }
    }

    //console.log(new_words[0]);
    //new_words.filter(unpassedWords);
}


document.addEventListener('DOMContentLoaded', () => {
    const game_id = document.querySelector('#game_id').value;
    const answer_label = document.querySelector('#answer_label');
    console.log('game loaded');
    fetch(`http://localhost:5000/api/games/${game_id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        //console.log(myJson.words);
        const word = findNewWord(myJson.words)
        //console.log(word);
        //const word_id = document.querySelector('#word_id');
        // console.log(word.word._id);
        //word_id.value = word.word._id;
        answer_label.innerHTML = word.word.langOne;
        // send a make game request and make a game object and save the id in the next button

    });
});

document.querySelector('#next_btn').addEventListener('click', (e) => {
    const game_id = document.querySelector('#game_id').value;
    // const word_id = document.querySelector('#word_id').value;
    const answer_label = document.querySelector('#answer_label').innerHTML;
    const answer_input = document.querySelector('#answer_input').value;

    fetch(`http://localhost:5000/api/games/${game_id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        const new_words = myJson.words;

        console.log(answer_label);
        console.log(answer_input);
        console.log(new_words);

        for (const value in new_words) {

            console.log(new_words[value].word.langOne);
            if (new_words[value].word.langOne === answer_label) {
                
                // if (word.langTwo === answer_input) {
                    console.log('match');
                    console.log(new_words[value].word.langTwo)
                    break;
                // }

            }
        }
    });
});

// on next word button click and do a 



