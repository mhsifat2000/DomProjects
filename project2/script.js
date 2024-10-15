function calculateBMI() {
  // Get references to input elements and their values within the function
  const weightInput = document.getElementById('wt-kg');
  const weightUnitSelect = document.getElementById('weight-select');
  const heightInput = document.getElementById('height');
  const heightUnitSelect = document.getElementById('height-select');
  const outputDisplay = document.getElementById('output'); 

  const weight = parseFloat(weightInput.value);
  const weightUnit = weightUnitSelect.value;
  const height = parseFloat(heightInput.value);
  const heightUnit = heightUnitSelect.value;

  // Input validation
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    outputDisplay.innerHTML = "Please enter valid weight and height values.";
    outputDisplay.style.color = "red"; 
    return; 
  }

  // Convert weight to kilograms
  let weightInKg = weight;
  if (weightUnit === 'pound') {
    weightInKg = weight / 2.20462;
  }

  // Convert height to meters
  let heightInMeters = height;
  if (heightUnit === 'ft') {
    heightInMeters = height / 3.28084;
  }

  // Calculate BMI
  const bmi = weightInKg / (heightInMeters * heightInMeters);

  // Display result with category
  displayResult(bmi, outputDisplay); // Pass outputDisplay as an argument
}

function displayResult(bmi, outputDisplay) { // Add outputDisplay as a parameter
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
  // Get references to input elements within the function
  const weightInput = document.getElementById('wt-kg');
  const weightUnitSelect = document.getElementById('weight-select');
  const heightInput = document.getElementById('height');
  const heightUnitSelect = document.getElementById('height-select');
  const outputDisplay = document.getElementById('output');

  weightInput.value = '';
  weightUnitSelect.value = 'kg';
  heightInput.value = '';
  heightUnitSelect.value = 'm';
  outputDisplay.innerHTML = '';
  outputDisplay.style.color = 'black'; 
}

// Keep the event listeners at the global level 
const resetBtn = document.getElementById('reset-btn'); 
const bmiBtn = document.getElementById('bmi-btn');
bmiBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', resetInputs);
