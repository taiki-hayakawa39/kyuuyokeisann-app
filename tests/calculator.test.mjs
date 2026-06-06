import assert from "node:assert/strict";
import { calculatePay, formatHours, formatYen } from "../src/calculator.js";

const standard = calculatePay({
  hourlyWage: 1200,
  workDays: 10,
  workHours: 6,
  workMinutes: 30,
  breakMinutes: 30,
  overtimeHours: 2,
  overtimeRate: 125,
  lateNightHours: 3,
  lateNightRate: 25,
  transportPerDay: 500,
  allowance: 1000,
  deduction: 800,
  taxRate: 10,
});

assert.equal(standard.regularHours, 60);
assert.equal(standard.basePay, 72000);
assert.equal(standard.overtimePay, 3000);
assert.equal(standard.lateNightPremium, 900);
assert.equal(standard.extraPay, 6000);
assert.equal(standard.grossPay, 81900);
assert.equal(standard.estimatedTax, 8190);
assert.equal(standard.totalDeduction, 8990);
assert.equal(standard.netPay, 72910);

const noNegativePay = calculatePay({
  hourlyWage: 1000,
  workDays: 1,
  workHours: 1,
  breakMinutes: 120,
  deduction: 999999,
});

assert.equal(noNegativePay.regularHours, 0);
assert.equal(noNegativePay.netPay, 0);
assert.equal(formatYen(123456), "123,456円");
assert.equal(formatHours(12.5), "12.5時間");

console.log("calculator tests passed");
