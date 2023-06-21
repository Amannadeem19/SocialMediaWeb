// posts = state 
import {COMMENTS,START_LOADING, END_LOADING, CREATE, FETCH_ALL, UPDATE, DELETE, FETCH_BY_SEARCH, FETCH_POST } from '../constants/actionTypes';
export default (state = {isLoading : true, posts: []}, action) => {
    switch (action.type) {
        
        case FETCH_POST:
            return {...state, post: action.payload};
        case START_LOADING:
            return {...state, isLoading : true};
        case END_LOADING:
            return {...state, isLoading : false};
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {...state, posts :  action.payload};
        case CREATE:
            return {...state,  posts:  action.payload};
        case UPDATE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        
            case COMMENTS:
                return {
                    ...state,
                    posts: state.posts.map((post) => {
                        // change the post that just received a comment ... 
                        if(post._id === action.payload._id){
                            return action.payload;
                        } 
                        // return all the other posts manually
                          return post;  
                    })
                };
            case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
        default:
            return state;
    }

}