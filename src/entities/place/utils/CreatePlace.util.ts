import { ICalculateParamsWithBonus } from "../../calculating"
import { IPlace } from "../types/Place.type"

export const createPlace = (params?: Partial<ICalculateParamsWithBonus>): IPlace => ({
    id: crypto.randomUUID(),
    title: '',
    params: {
        sum: params?.sum,
        apr: params?.apr,
        bonus: {
            sum: params?.bonus?.sum,
            apr: params?.bonus?.apr,
        }
    }
})