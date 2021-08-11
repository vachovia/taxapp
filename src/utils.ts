import { TaxBracket } from "./api";

interface TaxDetails {
  totalOwed: number;
  effectiveRate: number;
  perBracket: Array<TaxBracket & { owed: number }>;
}

export const calculateTaxes = (
  income: number | undefined,
  brackets: Array<TaxBracket>
): TaxDetails => {
  let incomeLeft = income || 0;

  const perBracket = brackets.map((b) => {
    const maxTaxable = b.max ? b.max - b.min : Infinity;
    const toBeTaxed = Math.max(0, Math.min(maxTaxable, incomeLeft));
    incomeLeft -= toBeTaxed;

    return {
      ...b,
      owed: toBeTaxed * b.rate,
    };
  });

  const totalOwed = perBracket.reduce((acc, b) => acc + b.owed, 0);

  return {
    totalOwed,
    effectiveRate: income && income > 0 ? totalOwed / income : 0,
    perBracket: perBracket,
  };
};

export const currencyFormatter =
  (precision: number, spacing = " ") =>
  (value: number) =>
    `$${spacing}${value.toFixed(precision)}`.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
