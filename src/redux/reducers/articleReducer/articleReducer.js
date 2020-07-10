import { 
   FETCH_ARTICLE_FAILURE, 
   FETCH_ARTICLE_REQUEST, 
   FETCH_ARTICLE_SUCCESS, 
   DELETE_ARTICLE, 
   SEARCH_ARTICLE,
   GET_MORE_ARTICLE,
   GET_ARTICLE_BY_ID
 } from "../../actions/articles/articleActionType";

const defaultState = {
   articles: [],
   data : null,
   loading: true,
   lang: ''
}

export const articleReducer = (state = defaultState, action) => {

   switch (action.type) {
      case FETCH_ARTICLE_REQUEST:
         return {
            ...state,
            loading: action.loading
         }

      case FETCH_ARTICLE_SUCCESS:
         return {
            ...state,
            articles: action.data,
            loading: action.loading
         }
      case GET_MORE_ARTICLE:
         return {
            ...state,
            articles: [...state.articles, ...action.data]
         }
      case FETCH_ARTICLE_FAILURE:
         return {
            ...state,
            articles: action.data,
            loading: action.loading
         }

      case DELETE_ARTICLE:
         const articles = state.articles.filter(article => article._id !== action.data)
         return {
            ...state,
            articles
         }
      case 'change-lang':
         return {
            ...state,
            lang: action.lang
         }
      case GET_ARTICLE_BY_ID:
         return {
            ...state,
            data: action.data
         }
      case SEARCH_ARTICLE : 
         return {
            ...state,
            articles : action.data
         }

      default:
         return state;
   }
}