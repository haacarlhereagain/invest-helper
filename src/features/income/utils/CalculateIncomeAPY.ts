import dayjs from "dayjs";
import { ICalculateParamsWithBonus, IIncomeAPY } from "../../../entities";
import { IPeriod } from "../../../shared/types";
import { getIncomePerDay } from "./GetIncomePerDay";
import { calculateIncome } from "./CalculateIncome";

export const calculateIncomeAPY = (params: ICalculateParamsWithBonus, period: IPeriod): IIncomeAPY[] => {
    if (!period.from || !period.to || !params.sum || !params.apr) {
        return [];
    }

    const incomes: IIncomeAPY[] = [];
    let currentDate = dayjs(period.from);
    let currentSum = params.sum;

    while (currentDate.isBefore(period.to) || currentDate.isSame(period.to)) {
        const income = calculateIncome({
            ...params,
            sum: currentSum,
        });
        currentSum += income.perDay;
        incomes.push({
            income: income.perDay,
            date: currentDate.valueOf(),
            total: currentSum,
        });
        currentDate = currentDate.add(1, 'day');
    }
    return incomes;
}