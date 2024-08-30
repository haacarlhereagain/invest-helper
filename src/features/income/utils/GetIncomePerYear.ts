import { DAYS_IN_YEAR } from "../constants";

export const getIncomePerYear = (incomePerDay: number): number => {
    return incomePerDay * DAYS_IN_YEAR;
}