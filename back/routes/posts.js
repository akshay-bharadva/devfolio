import express from "express";
import {createPost, getPosts, getPostsBySearch, getPost, commentPost, updatePost, deletePost, likePost} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.post('/:id/commentPost', auth, commentPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
