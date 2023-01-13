let paragraphInput = document.querySelector('.paragraphInput'),
    paragraphButton = document.querySelector('.paragraphButton')

paragraphButton.addEventListener('click', (e) => {
    let data = {
        'lineBreakCount': paragraphInput.value.split('\n').length,
        'words': paragraphInput.value.split(' ')
    }
    let tmp_to_del = []

    // adds in the real words when there is a \n (line break) in between them
    data.words.forEach((word, i) => {
        if (word.split('\n').length < 2) return

        tmp_to_del.push(i)
        
        word.split('\n').forEach(split => data.words.push(split))
    });

    // removes the array items with \n (line break) inside them
    tmp_to_del.forEach((word, i) => {
        data.words = remove_array_item(data.words, word - i)
    })

    // removes the periods
    data.words.forEach((word, i) => {
        data.words[i] = word.replaceAll('.', '');
    })

    // console.log(uniq);
    
    // changes the words to objects
    let tmpWordsObjects = []
    data.words.forEach((word, i) => {
        let wordObj = {
            'word': word,
            'count': 0
        }
        
        // increments count for each duplicate word
        data.words.forEach((currentWord) => {
            if (currentWord == word) {
                wordObj.count++
            }
        })
        
        tmpWordsObjects.push(wordObj)
    })
    
    // removes duplicate words from data.words
    // for the next line https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    data.words = [...new Set(data.words)]

    // moves the count of each word from tmpWrodsObjects into the data.words
    data.words = data.words.map(e => {
        return {
            'word': e,
            'count': tmpWordsObjects.filter(r => {
                return r.word == e;
            })
        }
    })

    // makes each word count a number
    data.words.forEach(word => {
        word.count = word.count.length
    })

    setData(data)
})

function setData(data) {
    let wordsObject = document.querySelector('.words.object')
    
    // console.log(data.words)
    document.querySelectorAll('.wordCell').forEach(e => e.remove())

    data.words.forEach(word => {
        let wordCell = document.createElement('div')
        wordCell.classList.add('wordCell')
        
        let wordKey = document.createElement('div')
        wordKey.classList.add('.key')
        wordKey.innerHTML = word.word
        
        let wordValue = document.createElement('div')
        wordValue.classList.add('.value')
        wordValue.innerHTML = word.count
        
        wordsObject.appendChild(wordCell)
        wordCell.appendChild(wordKey)
        wordCell.appendChild(wordValue)
    })
}