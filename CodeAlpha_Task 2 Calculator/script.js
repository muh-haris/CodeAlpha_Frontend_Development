const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");

    if (action === "clear") {
      currentInput = "";
      display.textContent = "0";
    } else if (action === "backspace") {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
    } else if (action === "=") {
      try {
        currentInput = eval(currentInput).toString();
        display.textContent = currentInput;
        resultDisplayed = true;
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    } else {
      if (resultDisplayed && /[0-9.]/.test(action)) {
        currentInput = action;
      } else {
        currentInput += action;
      }
      display.textContent = currentInput;
      resultDisplayed = false;
    }
  });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if ("0123456789+-*/.".includes(key)) {
    currentInput += key;
    display.textContent = currentInput;
  } else if (key === "Enter") {
    try {
      currentInput = eval(currentInput).toString();
      display.textContent = currentInput;
    } catch {
      display.textContent = "Error";
      currentInput = "";
    }
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || "0";
  } else if (key === "Escape") {
    currentInput = "";
    display.textContent = "0";
  }
});
