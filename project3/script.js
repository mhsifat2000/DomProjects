const urlAPI = 'https://api.api-ninjas.com/v1/quotes?category=health';
const keyAPI = 'e7Z0YXfbotov5ztD7ATCDQ==ShoAHuP6hrb4LpJS'; 
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
      console.log(data); 

      if (Array.isArray(data) && data.length > 0) {
        const quoteData = data[0]; 

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
        console.log('Quote copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy quote: ', err);
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

    // Improved advice logic
    let advice = "";
    if (bmi < 18.5) {
      advice = (18.5 * heightInMeters * heightInMeters - weightInKg).toFixed(2); 
      advice = `gain ${advice} kg to reach a normal BMI.`;
    } else if (bmi > 24.99) {
      advice = (weightInKg - 24.99 * heightInMeters * heightInMeters).toFixed(2);
      advice = `lose ${advice} kg to reach a normal BMI.`;
    } 
    else if(bmi <24.99) {
         
      advice = `lead a normal life for continue this BMI. `;
    }

    displayResult(bmi, outputDisplay, advice); 
  } else {
    console.warn("One or more BMI input/output elements not found.");
  }
}

function displayResult(bmi, outputDisplay, advice) {
  let category; 
  if (bmi <= 18.5) {
    category = "Underweight";
    outputDisplay.style.color = '#a400ff';
  } else if (bmi <= 24.99) {
    category = "Normal Weight"; 
    outputDisplay.style.color = '#00dc03';
  } else if (bmi <= 29.99) {
    category = "Overweight";
    outputDisplay.style.color = '#f8ff00';
  } else if (bmi <= 34.99) {
    category = "Class I obesity";
    outputDisplay.style.color = '#ff4900';
  } else if (bmi <= 39.99) {
    category = "Class II obesity";
    outputDisplay.style.color = '#ff005e';
  } else {
    category = "Class III obesity";
    outputDisplay.style.color = '#ff0a00';
  }

  outputDisplay.innerHTML = `Your BMI is: ${bmi.toFixed(2)}<br>Category: ${category} <br>Advice: You should ${advice}`;
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
