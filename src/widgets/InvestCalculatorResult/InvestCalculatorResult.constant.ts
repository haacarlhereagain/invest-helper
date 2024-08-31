import { IIncome } from "../../entities"

export const CALCULATOR_RESULS_LABELS: Record<keyof IIncome, string> = {
    perDay: 'Per day',
    perMonth: 'Per 30 days',
    perYear: 'Per 365 days',
}