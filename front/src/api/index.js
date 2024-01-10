import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`);

export const getPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPostData) => API.post('/posts', newPostData);

export const updatePost = (postId, updatedPostData) => API.put(`/posts/${postId}`, updatedPostData);

export const deletePost = (postId) => API.delete(`/posts/${postId}`);

export const likePost = (postId) => API.patch(`/posts/${postId}/likePost`);

export const signin = (formData) => API.post('/user/signin', formData);

export const signup = (formData) => API.post('/user/signup', formData);

export const comment = (comment, postId) => API.post(`posts/${postId}/commentPost`, { comment });
