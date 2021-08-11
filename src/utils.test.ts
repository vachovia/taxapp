import { TaxBracket } from "api";
import { calculateTaxes } from "./utils";

const sampleBrackets: TaxBracket[] = [
  { min: 0, max: 10000, rate: 0.1 },
  { min: 10000, max: 20000, rate: 0.2 },
  { min: 20000, rate: 0.5 },
];

const getTaxes = (income: number) => calculateTaxes(income, sampleBrackets);

test("Zero taxes on zero income", () => {
  expect(getTaxes(0).totalOwed).toBeCloseTo(0);
});

test("Zero taxes on negative income", () => {

  expect(getTaxes(-10000).totalOwed).toBeCloseTo(0);
});

test("Progressive increases", () => {
  expect(getTaxes(10000).totalOwed).toBeCloseTo(1000);
  expect(getTaxes(20000).totalOwed).toBeCloseTo(10000 * 0.1 + 10000 * 0.2);

  const { totalOwed, perBracket, effectiveRate } = getTaxes(30000);
  const expectedOwed = 10000 * 0.1 + 10000 * 0.2 + 10000 * 0.5;

  expect(totalOwed).toBeCloseTo(expectedOwed);
  expect(effectiveRate).toBeCloseTo(expectedOwed / 30000);
  expect(perBracket).toEqual([
    { min: 0, max: 10000, rate: 0.1, owed: 1000 },
    { min: 10000, max: 20000, rate: 0.2, owed: 2000 },
    { min: 20000, rate: 0.5, owed: 5000 },
  ]);
});
