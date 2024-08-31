export interface IColumn<T extends string = string> {
    field: T;
    label: string;
}