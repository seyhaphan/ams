import { GET_CATEGORY, DELETE_CATEGORY, POST_CATEGORY, UPDATE_CATEGORY } from "../../actions/categorys/categoryActionType";

const defaultState = {
   categorys: [],
}

export const categoryReducer = (state = defaultState, action) => {
   switch (action.type) {
      case GET_CATEGORY:
         return {
            ...state,
            categorys: action.data,
         }
      case POST_CATEGORY:
         return {
            ...state,
            categorys: [
               ...state.categorys,
               action.data
            ]
         }

      case UPDATE_CATEGORY:

         state.categorys.map(category => category._id === action.id ?
            (category.name = action.name) : category)
         return {
            ...state
         }

      case DELETE_CATEGORY:
         return {
            ...state,
            categorys: state.categorys.filter(category => category._id !== action.catId)
         }
      default:
         return state;
   }
}