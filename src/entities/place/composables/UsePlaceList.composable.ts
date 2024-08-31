import { ref } from "vue"
import { IPlace } from "../types/Place.type";
import { createPlace } from "../utils";
import { ICalculateParamsWithBonus } from "../../calculating";

export const usePlaceList = () => {
    const placeList = ref<IPlace[]>([]);

    const addPlace = (params?: ICalculateParamsWithBonus): void => {
        placeList.value.push(createPlace(params));
    }
    
    const deletePlace = (id: string): void => {
        placeList.value = placeList.value.filter(place => place.id !== id);
    }

    return {
        placeList,
        addPlace,
        deletePlace,
    }
}