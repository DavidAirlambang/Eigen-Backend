function reverseString (str) {
  const splitString = str.split('')
  const angka = splitString.pop()

  const reverseArray = splitString.reverse()

  const joinArray = reverseArray.join('')
  return joinArray + angka
}

console.log(reverseString('NEGIE1'))
