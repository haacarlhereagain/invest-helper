import { ICalculateParamsWithBonus, IIncome } from "../../../entities";
import { getIncomePerDay } from "./GetIncomePerDay";
import { getIncomePerMonth } from "./GetIncomePerMonth";
import { getIncomePerYear } from "./GetIncomePerYear";

export const calculateIncome = (params: ICalculateParamsWithBonus): IIncome => {
    if (!params.apr || !params.sum) {
        return {
          perDay: 0,
          perMonth: 0,
          perYear: 0,
        };
      }
      const bonusSumNormalized = params.bonus?.sum && params.bonus?.apr ? params.bonus?.sum :  0;
      const sumWithoutBonusSum = Math.max(params.sum - bonusSumNormalized, 0);
      const bonusSumAvailable = Math.min(bonusSumNormalized, params.sum);
      const perDayBonus = params.bonus?.apr && bonusSumAvailable ? getIncomePerDay(bonusSumAvailable, params.bonus?.apr) : 0;
      const perDay = getIncomePerDay(sumWithoutBonusSum, params.apr);
      const perDayFinalized = perDayBonus + perDay;
  
      return {
        perDay: perDayFinalized,
        perMonth: getIncomePerMonth(perDayFinalized),
        perYear: getIncomePerYear(perDayFinalized),
      }
}