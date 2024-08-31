import { ICalculateParamsWithBonus } from "../../calculating";

export interface IPlace {
    id: string;
    title: string;
    params: ICalculateParamsWithBonus;
}