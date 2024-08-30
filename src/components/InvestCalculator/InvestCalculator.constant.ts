import { IInvestCalculatorResult } from "./InvestCalculator.type";

export const CALCULATOR_RESULS_LABELS: Record<keyof IInvestCalculatorResult, string> = {
    perDay: 'Per day',
    perMonth: 'Per 30 days',
    perYear: 'Per 365 days',
}