import { GET_CATEGORY, POST_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "./categoryActionType"
import Axios from "axios"
import { baseUrl } from '../../../config/API';

export const getCategorys = () => {
   return async (dispatch) => {
      const result = await Axios.get(`${baseUrl}/category`);
      dispatch({
         type: GET_CATEGORY,
         data: result.data.data,
      })
   }
}

export const addCategory = (name, cb) => {
   return async (dispatch) => {
      const result = await Axios.post(`${baseUrl}/category`, name);
      dispatch({
         type: POST_CATEGORY,
         data: result.data.data,
      })
      cb(result.data.message)
   }
}

export const deleteCategory = (id) => {
   return async (dispatch) => {
      await Axios.delete(`${baseUrl}/category/${id}`);
      dispatch({
         type: DELETE_CATEGORY,
         catId: id,
      })
   }
}

export const updateCategory = (id, category, cb) => {
   return async (dispatch) => {
      const result = await Axios.put(`${baseUrl}/category/${id}`, category);
      console.log(category.name);
      dispatch({
         type: UPDATE_CATEGORY,
         name: category.name,
         id: id
      })
      cb(result.data.message)
   }
}