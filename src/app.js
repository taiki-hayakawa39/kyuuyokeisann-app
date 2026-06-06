import { DEFAULT_VALUES, calculatePay, formatHours, formatYen } from "./calculator.js";

const form = document.querySelector("#calculatorForm");
const resetButton = document.querySelector("#resetButton");

const fields = Object.keys(DEFAULT_VALUES);
const outputs = {
  netPay: document.querySelector("#netPay"),
  grossPay: document.querySelector("#grossPay"),
  basePay: document.querySelector("#basePay"),
  premiumPay: document.querySelector("#premiumPay"),
  extraPay: document.querySelector("#extraPay"),
  estimatedTax: document.querySelector("#estimatedTax"),
  totalDeduction: document.querySelector("#totalDeduction"),
  totalHours: document.querySelector("#totalHours"),
};

function readValues() {
  return Object.fromEntries(fields.map((field) => [field, form.elements[field].value]));
}

function render() {
  const result = calculatePay(readValues());

  outputs.netPay.textContent = formatYen(result.netPay);
  outputs.grossPay.textContent = formatYen(result.grossPay);
  outputs.basePay.textContent = formatYen(result.basePay);
  outputs.premiumPay.textContent = formatYen(result.premiumPay);
  outputs.extraPay.textContent = formatYen(result.extraPay);
  outputs.estimatedTax.textContent = formatYen(result.estimatedTax);
  outputs.totalDeduction.textContent = formatYen(result.totalDeduction);
  outputs.totalHours.textContent = `月間勤務時間: ${formatHours(result.totalHours)}`;
}

function resetForm() {
  fields.forEach((field) => {
    form.elements[field].value = DEFAULT_VALUES[field];
  });
  render();
}

form.addEventListener("input", render);
resetButton.addEventListener("click", resetForm);
render();
