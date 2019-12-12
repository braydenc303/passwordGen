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

// Begin with a password length of zero, no rules and set password = "";
// var passwordLength = 0;
// var rules = [];
// var password = ""

// Set up an event listener for the button to generate the password
document.getElementById('start').addEventListener('click', function() {
    // Begin by getting the relevant rules
    getRules();
});

// Set up an event listener for the button to copy the new password to the clipboard.
// Because this will be a dynamically created element, we need to target something that exists on page load,
// and then we can use event delegation to target the created element.
// Start by listening to the display div
document.addEventListener('click', function(event) {
    // If the id of the item clicked on is copy, then run the code to copy to the clipboard
    if(event.target.matches('#copy')) {
        // Get the text of the password div and save it to a variable
        var textToCopy = document.getElementById('password').innerHTML;
        // Call the copyToClipboard function and pass in the password
        copyToClipboard(textToCopy);
        // Let the user know it was copied
        alert("Copied to clipboard");
    }
})

function copyToClipboard(str) {
    // Create a text area element with the string that you want to copy:
    var el = document.createElement('textarea');
    el.value = str;
    // Append the text area to the page temporarily so that you can select it:
    document.body.appendChild(el);
    // Select the text:
    el.select();
    // Copy the text:
    document.execCommand('copy');
    // Remove it from the page:
    document.body.removeChild(el);
}



function generatePassword(rules) {
    var password = ""

    // Generate characters equivalent to the first rule
    for(var i = 0; i < parseInt(rules[0]); i++) {
        // Select a random character set
        var randomSet = rules[Math.floor((Math.random() * (rules.length - 1)) + 1)];
        // Select a random character out of that set
        var randomChar = randomSet[Math.floor(Math.random() * randomSet.length)];
        // Add that character to the password
        password += randomChar;
    }
    var display = document.getElementById('display');
    display.remove();
    // Create a new div
    var newDiv = document.createElement('div');
    // Set it's id to display
    newDiv.id = "display"
    // Create a div with id password to display the password and add a button to copy it to the clipboard.
    var passwordDiv = document.createElement('div');
    // Set it's id equal to the actual text "password"
    passwordDiv.id = "password";
    // Set it's text to the generated password
    passwordDiv.innerText = password;
    // Create a new button
    var copyButton = document.createElement('button');
    // Set it's id to 'copy'
    copyButton.id = "copy";
    // Set it's text to "Copy to Clipboard"
    copyButton.innerHTML = "Copy to Clipboard"
    // Append the password to the new div
    newDiv.append(passwordDiv);
    // Append the button to the nwe div
    newDiv.append(copyButton);

    document.body.append(newDiv)

}

function getRules() {
    var passwordLength = 0;
    var rules = [];
    // While the password length is falsy, Not a Number or === 0, prompt the user for a password length.
    while(!passwordLength || isNaN(parseInt(passwordLength)) || parseInt(passwordLength) === 0) {
        var passwordLength = prompt('Please enter the number of characters(minimum 8) in your password.');
    }
    // If the password length is less than 8, set it equal to 8
    if(parseInt(passwordLength) < 8) {
        passwordLength = '8'
    }
    // Push the password length to the rules array.
    rules.push(passwordLength);

    // While includeUppercase is falsy ie they don't enter a value, prompt the user for a yes or no
    while(!includeUppercase) {
        var includeUppercase = prompt('Should your password include uppercase letters? Y or N');
    }
    // If includeUppercase exists and is equal to y or yes(in any combination of case) push the set of
    // uppercase letters to the rules array
    if(includeUppercase && (includeUppercase.toLowerCase() === "y" || includeUppercase.toLowerCase() === 'yes')) {
        rules.push(uppercaseLetters);
    }

    // While includeLowercase is falsy ie they don't enter a value, prompt the user for a yes or no
    while(!includeLowercase) {
        var includeLowercase = prompt('Should your password include lowercase letters? Y or N');
    }
    // If includeLowercase exists and is equal to y or yes(in any combination of case) push the set of
    // lowercase letters to the rules array
    if(includeLowercase && (includeLowercase.toLowerCase() === "y" || includeLowercase.toLowerCase() === 'yes')) {
        rules.push(lowercaseLetters);
    }
    // While includeSpecialChar is falsy ie they don't enter a value, prompt the user for a yes or no
    while(!includeSpecialChar) {
        var includeSpecialChar = prompt('Should your password include special characters? Y or N');
    }
    // If includeSpecialChar exists and is equal to y or yes(in any combination of case) push the set of
    // special characters to the rules array
    if(includeSpecialChar && (includeSpecialChar.toLowerCase() === "y" || includeSpecialChar.toLowerCase() === 'yes')) {
        rules.push(specialCharacters);
    }
    // While includeNumbers is falsy ie they don't enter a value, prompt the user for a yes or no
    while(!includeNumbers) {
        var includeNumbers = prompt('Should your password include numbers? Y or N');
    }
    // If includeNumbers exists and is equal to y or yes(in any combination of case) push the set of
    // numbers to the rules array
    if(includeNumbers && (includeNumbers.toLowerCase() === "y" || includeNumbers.toLowerCase() === 'yes')) {
        rules.push(numbers);
    }

    // If the user selected No all rules, default to using the lowercase letters.
    if(rules.length === 1) {
        rules.push(lowercaseLetters);
    }

    // generate the password
    generatePassword(rules);

}

