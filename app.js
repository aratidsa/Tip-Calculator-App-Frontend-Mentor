
/* -------------Variables------------------- */

const billAmount = document.querySelector('.bill-amount')
const custom = document.querySelector('.custom')
const numberOfpeople = document.querySelector('.number-people')

const tipamount = document.querySelector('.amount')
const totalPerPerson = document.querySelector('.people')
const resetBtn = document.querySelector('.reset-btn')

// group of tip buttons
const tipButtons = document.querySelectorAll('.grp-tip-btn')

// warning message
const billzero = document.querySelector('.bill-zero')
const zero = document.querySelector('.zero')

const invalidChars = ["-", "e", "+", "E"]

let bill = 0

// num is number of people to split bill amount
let num = 0

let customTip = 0

// event handler that ensures only numeric input is accepted 
function onlyNumbers(e) {    
  var regexp = new RegExp(/^[0-9]*$/)
  var keynum = e.key ? e.keyCode : e.which
  return regexp.test(String.fromCharCode(keynum))
  }

// prevents Invalid Characters
function preventInvalidChars(inputElement) {
  inputElement.addEventListener("keydown", function(e) {
      if (invalidChars.includes(e.key)) {
        e.preventDefault()
      }
    })
  }

  //function is called for each of the input fields
preventInvalidChars(billAmount)
preventInvalidChars(custom)
preventInvalidChars(numberOfpeople)

// event listener for input field Bill
billAmount.addEventListener("input", function () {    
  bill = parseFloat(billAmount.value) || 0

    // Check if billAmount is 0 or less
  if (bill <= 0) {
    billzero.style.display = "inline-block"
    billAmount.style.borderColor = 'hsl(10, 63%, 59%)'
  } else {
      billzero.style.display = "none"
      billAmount.style.borderColor = ""
  }    
    calculateAndUpdate()   
  })

  // event listener for input field Number of People
  numberOfpeople.addEventListener("input", function () {
    num = parseFloat(numberOfpeople.value) || 0
    
    if (num <= 0) {
      zero.style.display = "inline-block"    
      numberOfpeople.style.borderColor = 'hsl(10, 63%, 59%)' 
    } else {
        zero.style.display = "none"    
        numberOfpeople.style.borderColor = "" // Reset to default 
    }   
    calculateAndUpdate()   
  }) 

  // event listener for input field Custom Percentage
  custom.addEventListener("input", handleCustomTip)  

  // handleCustomTip function for Custom Percentage Input
  function handleCustomTip() {
    customTip = parseFloat(custom.value) || 0
    calculateAndUpdate()  
  }

  // Update tip amount and total per person
  function updateTipAmount(tipPercentage = 0) {
    const tipAmount = (bill * (tipPercentage / 100)) / num
    tipamount.innerHTML = tipAmount.toFixed(2)
    totalPerPerson.innerHTML = ((bill / num) + tipAmount).toFixed(2)
  }

  // uses forEach to iterate over an array of buttons
  tipButtons.forEach((button) => {
      button.addEventListener("click", function () {             
      const tipPercentage = parseFloat(button.dataset.tip)
      updateTipAmount(tipPercentage)
    })
  })

  // enableTipButtonsAndCustom function to remove the disabled attribute
  function enableTipButtonsAndCustom() {
    tipButtons.forEach((button) => {
      button.removeAttribute("disabled")
    })
    custom.removeAttribute("disabled")
  }
  
  //check below condition to enable tip buttons
  function calculateAndUpdate() {
    if (bill > 0 && num > 0) {
      enableTipButtonsAndCustom();
      updateTipAmount(customTip);
    } else {
      tipamount.textContent = "0.00";
      totalPerPerson.textContent = "0.00";
    }
  }

  // Reset
  resetBtn.addEventListener("click", function () {
    // Clear the input fields
    [billAmount, custom, numberOfpeople].forEach((input) => {
      input.value = ''
      input.style.borderColor = ''
    })
  
    // Reset variables
    bill = 0 
    num = 0 
    customTip = 0 
  
    // Reset the displayed tip amount and total per person to "0.00"
    tipamount.innerHTML = "0.00"
    totalPerPerson.innerHTML = "0.00"

    // Re-enable the disabled attribute for tip buttons and custom input
  tipButtons.forEach((button) => {
    button.setAttribute("disabled", "disabled")
  })
  custom.setAttribute("disabled", "disabled")
  })
