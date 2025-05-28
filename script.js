// initial setup
const passwdOutput = document.getElementById("generatedPassword");
const slider = document.getElementById("length");
const passwdLength = document.getElementById("passwdLength");
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSpecial = document.getElementById("includeSpecial");
const inputCheckbox = [includeUppercase, includeLowercase, includeNumbers, includeSpecial];

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";


// generate password function
function generatePasswd() {
  let passwd = "";
  let allChars = "";

  if (includeLowercase.checked) allChars += lowercaseChars;
  if (includeUppercase.checked) allChars += uppercaseChars;
  if (includeNumbers.checked) allChars += numberChars;
  if (includeSpecial.checked) allChars += symbolChars;

  if (allChars.length === 0) {
    passwdOutput.value = "Wybierz przynajmniej jeden zestaw znaków!";
    return;
  }

  const length = parseInt(slider.value);
  for (let i = 0; i < length; i++) {
    passwd += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  passwdOutput.value = passwd;
}


// copy password to clipboard
function copyPasswd() {
  let passwd = passwdOutput.value;
  if (passwd.trim() === "") return;

  navigator.clipboard.writeText(passwd).then(() => {
    document.getElementById("copyStatus").textContent = "Skopiowano!";
    setTimeout(() => {
      document.getElementById("copyStatus").textContent = "";
    }, 2000);
  });
}


// checkbox change event
inputCheckbox.forEach(check => {
  check.addEventListener("change", () => {
    let checkedCount = Array.from(inputCheckbox).filter((cb) => cb.checked).length;
    if (checkedCount === 0) {
      check.checked = true;
      return;
    }
    generatePasswd();
  });
});


// slider change event
slider.addEventListener("input", () => {
  passwdLength.textContent = slider.value;
  generatePasswd();
});