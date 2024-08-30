export const getIncomePerDay = (sum: number, apr: number): number => {
    return apr / 365 / 100 * sum
}