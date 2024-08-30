import { ICalculateResult } from '../../entities';

export const CALCULATOR_RESULS_LABELS: Record<keyof ICalculateResult, string> = {
    perDay: 'Per day',
    perMonth: 'Per 30 days',
    perYear: 'Per 365 days',
}