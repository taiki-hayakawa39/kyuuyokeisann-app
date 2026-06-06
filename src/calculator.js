export const DEFAULT_VALUES = {
  hourlyWage: 1200,
  workDays: 12,
  workHours: 6,
  workMinutes: 0,
  breakMinutes: 45,
  overtimeHours: 0,
  overtimeRate: 125,
  lateNightHours: 0,
  lateNightRate: 25,
  transportPerDay: 0,
  allowance: 0,
  deduction: 0,
  taxRate: 0,
};

const numberOrZero = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
};

const yen = (value) => Math.round(value);

export function calculatePay(values) {
  const input = { ...DEFAULT_VALUES, ...values };
  const hourlyWage = numberOrZero(input.hourlyWage);
  const workDays = numberOrZero(input.workDays);
  const dailyWorkHours = numberOrZero(input.workHours) + numberOrZero(input.workMinutes) / 60;
  const dailyBreakHours = numberOrZero(input.breakMinutes) / 60;
  const paidHoursPerDay = Math.max(dailyWorkHours - dailyBreakHours, 0);
  const regularHours = paidHoursPerDay * workDays;
  const overtimeHours = numberOrZero(input.overtimeHours);
  const lateNightHours = numberOrZero(input.lateNightHours);

  const basePay = hourlyWage * regularHours;
  const overtimePay = hourlyWage * overtimeHours * (numberOrZero(input.overtimeRate) / 100);
  const lateNightPremium = hourlyWage * lateNightHours * (numberOrZero(input.lateNightRate) / 100);
  const transportPay = numberOrZero(input.transportPerDay) * workDays;
  const allowance = numberOrZero(input.allowance);
  const deduction = numberOrZero(input.deduction);

  const grossPay = basePay + overtimePay + lateNightPremium + transportPay + allowance;
  const estimatedTax = grossPay * (numberOrZero(input.taxRate) / 100);
  const totalDeduction = deduction + estimatedTax;
  const netPay = Math.max(grossPay - totalDeduction, 0);

  return {
    regularHours,
    totalHours: regularHours + overtimeHours + lateNightHours,
    basePay: yen(basePay),
    overtimePay: yen(overtimePay),
    lateNightPremium: yen(lateNightPremium),
    premiumPay: yen(overtimePay + lateNightPremium),
    transportPay: yen(transportPay),
    allowance: yen(allowance),
    extraPay: yen(transportPay + allowance),
    grossPay: yen(grossPay),
    estimatedTax: yen(estimatedTax),
    totalDeduction: yen(totalDeduction),
    netPay: yen(netPay),
  };
}

export function formatYen(value) {
  return `${Math.round(value).toLocaleString("ja-JP")}円`;
}

export function formatHours(value) {
  return `${Number(value.toFixed(2)).toLocaleString("ja-JP")}時間`;
}
