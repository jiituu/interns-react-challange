import { SET_LIST,LIST_DATA } from "./constant";



export const listReducer =(data=[],action)=>{
    switch(action.type){
        case SET_LIST :
            return [...action.data]
        default :
        return data
    }
}