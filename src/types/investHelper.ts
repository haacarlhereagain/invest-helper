export interface ICalculator {
    id: string;
    title: string;
    params: ICalculatorParams;
}

export interface ICalculate {
    sum: number | undefined;
    apr: number | undefined
}

export interface ICalculatorParams extends ICalculate {
    bonus?: ICalculate;
}