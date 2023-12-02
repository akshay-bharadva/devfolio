import * as api from '../api';
import {ACTIONS_CONSTANTS} from "../constants/actionTypes";
const {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    START_LOADING,
    END_LOADING,
    FETCH_POST,
    COMMENT_POST
} = ACTIONS_CONSTANTS;

// Actions creators - functions that return an action which is an object that have type and payload properties

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPosts(page);
        console.log(data)
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err, '***error from get posts actions');
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err, 'error from get posts by search action');
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.getPost(id);
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err, 'error from get single post action');
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`);
        dispatch({type: CREATE, payload: data });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err, 'error from create post action');
    }
}

export const updatePost = (postId, updatedPostData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(postId, updatedPostData);
        dispatch({type: UPDATE, payload: data});

    } catch (err) {
        console.log(err, 'error from update post action');
    }
}

export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.deletePost(postId);
        dispatch({type: DELETE, payload: postId});

    } catch (err) {
        console.log(err, 'error from delete post action');
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId);
        dispatch({type: LIKE, payload: data});
    } catch (err) {
        console.log(err, 'error form like post action');
    }
}

export const commentPost = (comment, postId) => async (dispatch) => {
    try {
        const { data } = await api.comment(comment, postId);
        dispatch({type: COMMENT_POST, payload: data});
        return data.comments;

    } catch (err) {
        console.log(err, 'error form comment post action');
    }
}
