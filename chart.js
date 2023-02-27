// Set up variables for DOM elements
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const dosageInput = document.querySelector('#dosage');
const frequencySelect = document.querySelector('#frequency');
const quantityInput = document.querySelector('#quantity');
const reminderInput = document.querySelector('#reminder');
const dosageDisplay = document.querySelector('#dosage-display');
const savedMedicationsTable = document.querySelector('#saved-medications');
const chartContainer = document.querySelector('#chart-container');

// Set up arrays to store medication data and chart data
let medications = [];
let chartData = [];

// Add event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get values from form inputs
  const name = nameInput.value;
  const dosage = dosageInput.value;
  const frequency = frequencySelect.value;
  const quantity = quantityInput.value;
  const reminder = reminderInput.value;

  // Create medication object and add to medications array
  const medication = {
    name: name,
    dosage: dosage,
    frequency: frequency,
    quantity: quantity,
    reminder: reminder
  };
  medications.push(medication);

  // Clear form inputs
  nameInput.value = '';
  dosageInput.value = '';
  frequencySelect.value = 'daily';
  quantityInput.value = '';
  reminderInput.value = '';

  // Update dosage display
  updateDosageDisplay();

  // Update saved medications table
  updateSavedMedicationsTable();

  // Update chart data and redraw chart
  updateChartData();
  drawChart();
});

// Function to update dosage display
function updateDosageDisplay() {
  let totalDosage = 0;
  medications.forEach(function(medication) {
    totalDosage += parseFloat(medication.dosage);
  });
  dosageDisplay.textContent = 'Total dosage: ' + totalDosage + ' mg';
}

// Function to update saved medications table
function updateSavedMedicationsTable() {
  // Clear table
  while (savedMedicationsTable.firstChild) {
    savedMedicationsTable.removeChild(savedMedicationsTable.firstChild);
  }

  // Add table header
  const headerRow = document.createElement('tr');
  const nameHeader = document.createElement('th');
  nameHeader.textContent = 'Name';
  const dosageHeader = document.createElement('th');
  dosageHeader.textContent = 'Dosage';
  const frequencyHeader = document.createElement('th');
  frequencyHeader.textContent = 'Frequency';
  const quantityHeader = document.createElement('th');
  quantityHeader.textContent = 'Quantity';
  const reminderHeader = document.createElement('th');
  reminderHeader.textContent = 'Reminder';
  headerRow.appendChild(nameHeader);
  headerRow.appendChild(dosageHeader);
  headerRow.appendChild(frequencyHeader);
  headerRow.appendChild(quantityHeader);
  headerRow.appendChild(reminderHeader);
  savedMedicationsTable.appendChild(headerRow);

  // Add table rows for each medication
  medications.forEach(function(medication) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = medication.name;
    const dosageCell = document.createElement('td');
    dosageCell.textContent = medication.dosage + ' mg';
    const frequencyCell = document.createElement('td');
    frequencyCell.textContent = medication.frequency;
    const quantityCell = document.createElement('td');
    quantityCell.textContent = medication.quantity;
    const reminderCell = document.createElement('td');
    reminderCell.textContent = medication.reminder;
    row.appendChild(nameCell);
    row.appendChild(dosageCell);
    row.appendChild(frequencyCell);
    row.appendChild(quantityCell);
    row.appendChild(reminderCell);
    savedMedicationsTable.appendChild(row);
  });
}
