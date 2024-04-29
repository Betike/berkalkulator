import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {

  return twMerge(clsx(inputs))
}

export function calculateNetSalary(person) {
  const {br_salary, under25, personal, married, hasFamily} = person
  const szjaRate = 0.15;
  const tbRate = 0.185;

  const bruttoSalary = br_salary
  const isUnder25 = under25.checked
  const hasPersonalTaxCredit = personal.checked
  const hasFirstMarriageCredit = married.checked
  const marriageDate = married.date
  const hasFamilyCredit = hasFamily.checked
  const totalDependents = hasFamily.sustained
  const qualifyingDependents = hasFamily.beneficiary

  let taxableIncome = bruttoSalary;

  if (isUnder25) {
    const szjaExemptionLimit = 499952;
    if (bruttoSalary > szjaExemptionLimit) {
      taxableIncome = bruttoSalary - szjaExemptionLimit;
    } else {
      taxableIncome = 0;
    }
  }
  
  const szja = taxableIncome * szjaRate;
  const tb = bruttoSalary * tbRate;
  
  let totalTax = szja + tb;

  if (hasPersonalTaxCredit) {
    const personalTaxCredit = 77300;
    totalTax = Math.max(totalTax - personalTaxCredit, 0);
  }

  const currentDate = new Date();
  const marriageDateObj = new Date(marriageDate);

  let firstMarriageCredit = 0;
  const marriageDurationInMonths = (currentDate.getFullYear() - marriageDateObj.getFullYear()) * 12 + currentDate.getMonth() - marriageDateObj.getMonth();

  if (hasFirstMarriageCredit && marriageDurationInMonths < 24) {
    firstMarriageCredit = 5000; 
  }

  let dependentTaxCredit = 0;
  if (hasFamilyCredit) {
    if (qualifyingDependents === 1) {
      dependentTaxCredit = 10000 * totalDependents;
    } else if (qualifyingDependents === 2) {
      dependentTaxCredit = 20000 * totalDependents;
    } else if (qualifyingDependents >= 3) {
      dependentTaxCredit = 33000 * totalDependents;
    }
  }

  const netSalary = bruttoSalary - totalTax + firstMarriageCredit + dependentTaxCredit;

  let realNetSalary = Math.min(netSalary, bruttoSalary)
  
  return realNetSalary;
}

export function validMarriageDate(date) {
  const currentDate = new Date();
  const marriageDateObj = new Date(date);

  const marriageDurationInMonths = (currentDate.getFullYear() - marriageDateObj.getFullYear()) * 12 + currentDate.getMonth() - marriageDateObj.getMonth();

  if (marriageDurationInMonths < 24) {
    return true
  } else {
    return false
  }
}

export function sumNetSalaries(people) {
  return people.reduce((acc, person) => acc + Math.round(person.ne_salary), 0);
}