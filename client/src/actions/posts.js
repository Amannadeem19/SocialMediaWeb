import {COMMENTS,FETCH_POST, START_LOADING, END_LOADING, FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from '../constants/actionTypes';
import * as api from '../api';


//ACTIONS CREATORS - are the functions that return the actions 

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // response has data attribute, destructured it
        const { data } = await api.fetchPosts(page)
        console.log(data);
        const action = { type: FETCH_ALL, payload: data }
        dispatch(action);
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }

}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // response has data attribute, destructured it
        const { data } = await api.fetchPost(id)
        console.log(data);
        const action = { type: FETCH_POST, payload: data }
        dispatch(action);
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}
export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post)
        navigate(`/posts/${data._id}`)
        const action = {
            type: CREATE,
            payload: data
        }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        const action = {
            type: UPDATE,
            payload: data
        }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }

}

export const deletePost = (id) => async (dispatch) => {
    try {
        console.log('im here');
        await api.deletePost(id);
        dispatch({
            type: DELETE,
            payload: id
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {

        const { data } = await api.likePost(id)
        const action = {
            type: UPDATE,
            payload: data
        }
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (comment, post_id) => async(dispatch) =>{
    try {
      const {data} =  await api.comment(comment, post_id)
        dispatch({type: COMMENTS, payload: data})
        return data.comments;
    } catch (error) {
        
    }
}