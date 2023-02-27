// Get form inputs and submit button
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const dosageInput = document.getElementById('dosage');
const frequencyInput = document.getElementById('frequency');
const quantityInput = document.getElementById('quantity');
const reminderInput = document.getElementById('reminder');
const submitButton = document.querySelector('input[type="submit"]');
const dosageDisplay = document.getElementById('dosage-display');
const quantityDisplay = document.getElementById('quantity-display');


// Add event listener to submit button
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
   // Prevent form from submitting

  // Get values from form inputs
  const nameValue = nameInput.value;
  const dosageValue = dosageInput.value;
  const frequencyValue = frequencyInput.value;
  const quantityValue = quantityInput.value;
  const reminderValue = reminderInput.value;

  // Validate form inputs
  if (!nameValue || !dosageValue || !frequencyValue || !quantityValue || !reminderValue) {
    alert('Please fill in all fields.');
    return;
  }

  // Create medication object
  const medication = {
    name: nameValue,
    dosage: dosageValue,
    frequency: frequencyValue,
    quantity: quantityValue,
    reminder: reminderValue
  };

  // Save medication to local storage
  let medications = JSON.parse(localStorage.getItem('medications')) || [];
  medications.push(medication);
  localStorage.setItem('medications', JSON.stringify(medications));

  // Reset form inputs
  form.reset();

  // Show success message
  alert('Medication saved successfully!');
});

// Display medications on load
window.addEventListener('load', function() {
  let medications = JSON.parse(localStorage.getItem('medications')) || [];
  const medicationList = document.getElementById('medication-list');
  medicationList.innerHTML = '';

  // Create table rows for each medication
  medications.forEach(function(medication, index) {
    const row = medicationList.insertRow();
    const nameCell = row.insertCell(0);
    const dosageCell = row.insertCell(1);
    const frequencyCell = row.insertCell(2);
    const quantityCell = row.insertCell(3);
    const reminderCell = row.insertCell(4);
    const deleteCell = row.insertCell(5);

    nameCell.innerText = medication.name;
    dosageCell.innerText = medication.dosage;
    frequencyCell.innerText = medication.frequency;
    quantityCell.innerText = medication.quantity;
    reminderCell.innerText = medication.reminder;

    // Add delete button to last cell
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
      medications.splice(index, 1);
      localStorage.setItem('medications', JSON.stringify(medications));
      row.remove();
    });
    deleteCell.appendChild(deleteButton);
  });
});

// Show medication dosage on change
dosageInput.addEventListener('input', function() {
  const dosageDisplay = document.getElementById('dosage-display');
  dosageDisplay.innerText = dosageInput.value;
});

// Show medication quantity on change
quantityInput.addEventListener('input', function() {
  const quantityDisplay = document.getElementById('quantity-display');
  quantityDisplay.innerText = quantityInput.value;
});

