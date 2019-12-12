console.log("app is loaded");

var uppercaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];
var lowercaseLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialCharacters = [
    "@",
    "%",
    "+",
    "\\",
    "/",
    "'",
    "!",
    "#",
    "$",
    "^",
    "?",
    ":",
    ",",
    ")",
    "(",
    "}",
    "{",
    "]",
    "[",
    "~",
    "-",
    "_",
    "."
];

var passwordLength = 0;
var rules = [];
var password = ""
document.getElementById('start').addEventListener('click', function() {
    getRules();
});



function generatePassword() {
    for(var i = 0; i < parseInt(rules[0]); i++) {
        var randomSet = rules[Math.floor((Math.random() * (rules.length - 1)) + 1)];
        var randomChar = randomSet[Math.floor(Math.random() * randomSet.length)];
        password += randomChar;
    }
    var passwordDiv = document.createElement('div');
    passwordDiv.id = "password";
    passwordDiv.innerText = password;
    document.getElementById('display').append(passwordDiv);
}

function getRules() {
    while(!passwordLength || isNaN(parseInt(passwordLength)) || parseInt(passwordLength) === 0) {
        var passwordLength = prompt('Please enter the number of characters(minimum 8) in your password.');
    }
    if(parseInt(passwordLength) < 8) {
        passwordLength = '8'
    }
    rules.push(passwordLength);

    while(!includeUppercase) {
        var includeUppercase = prompt('Should your password include uppercase letters?');
    }

    if(includeUppercase && (includeUppercase.toLowerCase() === "y" || includeUppercase.toLowerCase() === 'yes')) {
        rules.push(uppercaseLetters);
    }

    while(!includeLowercase) {
        var includeLowercase = prompt('Should your password include lowercase letters?');
    }
    
    if(includeLowercase && (includeLowercase.toLowerCase() === "y" || includeLowercase.toLowerCase() === 'yes')) {
        rules.push(lowercaseLetters);
    }

    while(!includeSpecialChar) {
        var includeSpecialChar = prompt('Should your password include special characters?');
    }
    
    if(includeSpecialChar && (includeSpecialChar.toLowerCase() === "y" || includeSpecialChar.toLowerCase() === 'yes')) {
        rules.push(specialCharacters);
    }

    while(!includeNumbers) {
        var includeNumbers = prompt('Should your password include numbers?');
    }
    
    if(includeNumbers && (includeNumbers.toLowerCase() === "y" || includeNumbers.toLowerCase() === 'yes')) {
        rules.push(numbers);
    }
    if(rules.length === 1) {
        rules.push(lowercaseLetters);
    }

    console.log(rules);

    generatePassword();

}

