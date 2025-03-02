let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptionButton = document.querySelectorAll('.adv-option-button');
let linkButton = document.getElementById("createLink");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let formatBlock = document.getElementById("formatBlock");
let offOption = document.getElementById("offOption");

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

// All HTML elements with the class name option-button'
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

// All HTML elements with the class name adv-option-button
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value)
    });
});
formatBlock.value = offOption.value;

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL:");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    }else if (!/.com/i.test(userLink)) {
        alert("Wrong link or you didn't provide any links.")
    }else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});


let fontlist = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];
fontlist.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
});
fontName.value = "Times New Roman";

for (let i = 1; i < 7; i++) {
    let optionSize = document.createElement("option");
    optionSize.value = i;
    optionSize.innerHTML = i;
    fontSizeRef.appendChild(optionSize);
};
fontSizeRef.value = 3;
