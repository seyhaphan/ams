import { FILE_UPLOAD_FIALURE, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_REQUEST } from "../../actions/fileUplaod/fileUplpadActionType";

const defaultState = {
   imageUrl: '',
}

export const fileUploadReducer = (state = defaultState, action) => {
   switch (action.type) {
      case FILE_UPLOAD_REQUEST:
         return {
            ...state,
         }
      case FILE_UPLOAD_SUCCESS:
         return {
            ...state,
            imageUrl: action.data
         }
      case FILE_UPLOAD_FIALURE:
         return {
            ...state,
         }
      default:
         return state;
   }
}