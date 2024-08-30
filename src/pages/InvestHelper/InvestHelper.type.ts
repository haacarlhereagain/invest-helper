import { ICalculateParamsWithBonus } from "../../entities";

export interface IPlace {
    id: string;
    title: string;
    params: ICalculateParamsWithBonus;
}