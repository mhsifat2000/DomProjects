const urlAPI = 'https://api.api-ninjas.com/v1/quotes?category=health';
const keyAPI = 'e7Z0YXfbotov5ztD7ATCDQ==ShoAHuP6hrb4LpJS'; // Replace with your actual API key

window.onload = () => {
  main();
  getQuotes();
  setInterval(getQuotes, 10000);
}

function main() {
  const copyButton = document.getElementById('cpBtn');
  if (copyButton) {
    copyButton.addEventListener('click', copyToClipboard);
  } else {
    console.warn("Copy button not found.");
  }

  const bmiBtn = document.getElementById('bmi-btn');
  if (bmiBtn) {
    bmiBtn.addEventListener('click', calculateBMI);
  } else {
    console.warn("BMI button not found.");
  }

  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetInputs);
  } else {
    console.warn("Reset button not found.");
  }
}

const getQuotes = () => {
  fetch(urlAPI, {
      headers: { 'X-Api-Key': keyAPI }
    })
    .then(data => data.json())
    .then(data => {
      console.log(data); // Log the API response to the console

      // Check if 'data' is an array and has at least one element
      if (Array.isArray(data) && data.length > 0) {
        const quoteData = data[0]; 

        // Check if the necessary properties exist in the first element
        if (quoteData.quote && quoteData.author) {
          const quotBody = document.getElementById('quotBody');
          const quotAuthor = document.getElementById('quotAuthor');
          quotBody.innerText = quoteData.quote;
          quotAuthor.innerText = quoteData.author;
        } else {
          console.error("Quote or author property missing from the API response:", quoteData);
        }

      } else {
        console.error('API did not return an array of quotes:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching quotes:', error);
    });
}


function copyToClipboard() {
  const quotBody = document.getElementById('quotBody');
  if (quotBody) {
    navigator.clipboard.writeText(quotBody.innerText)
      .then(() => {
        alert('Quote copied to clipboard!');
        // Optional: Provide visual feedback to the user
      })
      .catch(err => {
        console.error('Failed to copy quote: ', err);
        // Optional: Display an error message to the user
      });
  } else {
    console.warn("Quote element not found for copying.");
  }
}

function calculateBMI() {
  const weightInput = document.getElementById('wt-kg');
  const weightUnitSelect = document.getElementById('weight-select');
  const heightInput = document.getElementById('height');
  const heightUnitSelect = document.getElementById('height-select');
  const outputDisplay = document.getElementById('output');

  if (weightInput && weightUnitSelect && heightInput && heightUnitSelect && outputDisplay) {
    const weight = parseFloat(weightInput.value);
    const weightUnit = weightUnitSelect.value;
    const height = parseFloat(heightInput.value);
    const heightUnit = heightUnitSelect.value;

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      outputDisplay.innerHTML = "Please enter valid weight and height values.";
      outputDisplay.style.color = "red";
      return;
    }

    let weightInKg = weight;
    if (weightUnit === 'pound') {
      weightInKg = weight / 2.20462;
    }

    let heightInMeters = height;
    if (heightUnit === 'ft') {
      heightInMeters = height / 3.28084;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    displayResult(bmi, outputDisplay);
  } else {
    console.warn("One or more BMI input/output elements not found.");
  }
}

function displayResult(bmi, outputDisplay) {
  let category = "";
  if (bmi <= 18.5) {
    category = "Underweight";
    outputDisplay.style.color = '#a400ff'
  } else if (bmi <= 24.99) {
    category = "Normal Weight";
    outputDisplay.style.color = '#00dc03'
  } else if (bmi <= 29.99) {
    category = "Overweight";
    outputDisplay.style.color = '#f8ff00'
  } else if (bmi <= 34.99) {
    category = "Class I obesity";
    outputDisplay.style.color = '#ff4900'
  } else if (bmi <= 39.99) {
    category = "Class II obesity";
    outputDisplay.style.color = '#ff005e'
  } else {
    category = "Class III obesity";
    outputDisplay.style.color = '#ff0a00'
  }

  outputDisplay.innerHTML = `Your BMI is: ${bmi.toFixed(2)}<br>Category: ${category}`;
}

function resetInputs() {
  const weightInput = document.getElementById('wt-kg');
  const weightUnitSelect = document.getElementById('weight-select');
  const heightInput = document.getElementById('height');
  const heightUnitSelect = document.getElementById('height-select');
  const outputDisplay = document.getElementById('output');

  if (weightInput && weightUnitSelect && heightInput && heightUnitSelect && outputDisplay) {
    weightInput.value = '';
    weightUnitSelect.value = 'kg';
    heightInput.value = '';
    heightUnitSelect.value = 'm';
    outputDisplay.innerHTML = '';
    outputDisplay.style.color = 'black';
  } else {
    console.warn("One or more BMI input/output elements not found for reset.");
  }
}
