import { SEARCH_ARTICLE,FETCH_ARTICLE_FAILURE, FETCH_ARTICLE_REQUEST, FETCH_ARTICLE_SUCCESS, DELETE_ARTICLE, GET_MORE_ARTICLE } from './articleActionType'
import Axios from 'axios'
import { baseUrl } from '../../../config/API'

export const getArticles = () => {
   return async (dispatch) => {
      try {
         dispatch({
            type: FETCH_ARTICLE_REQUEST,
            data: [],
            loading: true
         })
         const result = await Axios.get(`${baseUrl}/articles?page=1&size=10`)

         dispatch({
            type: FETCH_ARTICLE_SUCCESS,
            data: result.data.data,
            loading: false
         })

      } catch (error) {
         dispatch({
            type: FETCH_ARTICLE_FAILURE,
            data: [],
            loading: true
         })
      }
   }
}
export const getMoreArticle = (page, cb) => {
   return async (dispatch) => {

      const result = await Axios.get(`${baseUrl}/articles?page=${page}&size=10`)

      dispatch({
         type: GET_MORE_ARTICLE,
         data: result.data.data,
      })
      cb(result.data.data)
   }
}

export const getArticleById = (id, cb) => {
   return async () => {
      const result = await Axios.get(`${baseUrl}/articles/${id}`)
      cb(result.data.data)
   }
}

export const postArticle = (article, cb) => {
   return async () => {
      const result = await Axios.post(`${baseUrl}/articles`, article)
      cb(result.data.message)
   }
}

export const updateArticle = (articleId, article, cb) => {
   return async () => {
      const result = await Axios.patch(`${baseUrl}/articles/${articleId}`, article)
      cb(result.data.message)
   }
}

export const deleteArticle = (articleId) => {
   return async (dispatch) => {
      await Axios.delete(`${baseUrl}/articles/${articleId}`)
      dispatch({
         type: DELETE_ARTICLE,
         data: articleId
      })
   }
}

export const changeLanguage = lang => {
   return (dispatch) => {
      dispatch({
         type: 'change-lang',
         lang: lang
      })
   }
}


export const searchArticle = (title) => {
   return async (dispatch) => {
      const result = await Axios.get(`${baseUrl}/articles?title=${title}`)
      dispatch({
         type : SEARCH_ARTICLE,
         data : result.data.data
      })
   }
}