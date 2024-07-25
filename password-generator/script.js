const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')


// FIRST PART =======================================================

// The static String.fromCharCode() method returns a string created from the specified sequence of UTF-16 code units.

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
	// check the char code here: https://www.w3schools.com/html/html_charset.asp
}
// console.log(getRandomLower())

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
// console.log(getRandomUpper())

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
// console.log(getRandomNumber())

function getRandomSymbol() {
	const symbols = "!@#$%^&*()+,-./{}[]=<>'"
	return symbols[Math.floor(Math.random() * symbols.length)]
}
// console.log(getRandomSymbol())




// SECOND STEP ===========
// saving the values of each function in the randomFunc obj key
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}



// THIRD STEP ===========
// Take the valus of each element and passing as a params to the generatePassword function

generateEl.addEventListener('click', () => {
	const length = +lengthEl.value // the plus singn infront of the lenghtEl parses it into a number
	const hasLower = lowercaseEl.checked // using checked because the value of checkbox is true or false
	const hasUpper = uppercaseEl.checked
	const hasNumbers = numbersEl.checked
	const hasSymbols = symbolsEl.checked
	// console.log(hasLower, hasUpper, hasNumbers, hasSymbols, length)

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length)
})

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = ''
	const typesCount = lower + upper + number + symbol // typesCount gives us how many checkbox are selected
	// console.log(typesCount)
	const typesArr = [{ lower }, { upper }, { number }, { symbol }] // typesArr gives us the value of each "key" ex: [ {lower: false}, {upper: true}, {numbre: true}, {symbol: false} ]
		.filter(item => Object.values(item)[0]) // filtering out anything (object) that has "false" as a value
	// console.log(typesArr)

	if (typesCount === 0) {
		return ''
	}
	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0] // funcName gives us the key of each object in typesArr ex: lower, upper, number, symbol (if every checkbox are checked)
			generatedPassword += randomFunc[funcName]() // randomFunc takes as index whatever the funcName is and append on generatedPassword. And we add the paranteses to call the func 
		})
	}

	const shuffledChars = generatedPassword
		.slice(0, length) // return a shallow copy the "selected" portion. .slice(start, end)
		.split('') // split() method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array
		.sort(function () { return 0.5 - Math.random() }) //sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values
		.join(''); //join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string

	const finalPassword = shuffledChars

	return finalPassword

}



//FINAL STEP ===========

clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea')
	const password = resultEl.innerText

	if (!password) { return }

	textarea.value = password
	document.body.appendChild(textarea)
	textarea.select()
	document.execCommand('copy')
	textarea.remove()
	alert('Password copied to clipboard')

})