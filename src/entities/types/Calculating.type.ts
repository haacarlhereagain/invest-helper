export interface ICalculateParams {
    sum: number | undefined;
    apr: number | undefined
}

export interface ICalculateParamsWithBonus extends ICalculateParams {
    bonus?: ICalculateParams;
}

export interface ICalculateResult {
    perMonth: number;
    perYear: number;
    perDay: number;
}