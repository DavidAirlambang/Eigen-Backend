function longestWord (sentence) {
  const words = sentence.split(' ')

  let longestWord = ''

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i]
    }
  }

  return longestWord
}

const sentence = 'Saya sangat senang mengerjakan soal algoritma'
console.log(longestWord(sentence))
