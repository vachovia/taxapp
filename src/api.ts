import axios from "axios";

export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export const getBrackets = async () => {
  type Response = { tax_brackets: TaxBracket[] };

  const { data } = await axios.get<Response>(
    "http://localhost:5000/tax-calculator/brackets"
  );
  return data.tax_brackets;
};
