import { DAYS_IN_MONTH } from "../constants";

export const getIncomePerMonth = (incomePerDay: number): number => {
    return incomePerDay * DAYS_IN_MONTH;
}