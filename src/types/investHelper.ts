export interface ICalculator {
    id: string;
    title: string;
    params: ICalculatorParams;
}

export interface ICalculatorParams {
    apr: number | undefined;
    sum: number | undefined;
}