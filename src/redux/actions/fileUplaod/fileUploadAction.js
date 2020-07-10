import Axios from "axios"
import { baseUrl } from '../../../config/API';
import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_REQUEST, FILE_UPLOAD_FIALURE } from "./fileUplpadActionType";

export const uploadFile = (file) => {
   return async (dispatch) => {
      try {

         dispatch({
            type: FILE_UPLOAD_REQUEST,
            data: '',
         })

         const result = await Axios.post(`${baseUrl}/images`, file);
         dispatch({
            type: FILE_UPLOAD_SUCCESS,
            data: result.data.url,
         })

      } catch (error) {

         dispatch({
            type: FILE_UPLOAD_FIALURE,
            data: '',
         })

      }
   }
}