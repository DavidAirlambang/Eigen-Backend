function countWords (input, query) {
  const counts = []

  const inputFrequency = {}
  input.forEach(word => {
    inputFrequency[word] = (inputFrequency[word] || 0) + 1
  })

  query.forEach(word => {
    counts.push(inputFrequency[word] || 0)
  })

  return counts
}

const INPUT = ['xc', 'dz', 'bbb', 'dz']
const QUERY = ['bbb', 'ac', 'dz']

console.log(countWords(INPUT, QUERY))
