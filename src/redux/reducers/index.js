import { combineReducers } from "redux"
import { articleReducer } from "./articleReducer/articleReducer";
import { categoryReducer } from "./categoryReducer/categoryReducer";
import { fileUploadReducer } from "./fileUploadReducer/fileUploadReducer";

export const reducers = {
   articleReducer: articleReducer,
   categoryReducer: categoryReducer,
   fileUploadReducer: fileUploadReducer,
}

export const rootReducer = combineReducers(reducers);