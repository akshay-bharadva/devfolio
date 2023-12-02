import PostMessage from "../modules/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 6;
        // get the starting index of every page
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});
        // _id: -1 => from the newest to the oldest
        // limit => posts per page
        // skip => skip all the previous pages and not fetch them again
        const post = await PostMessage
            .find()
            .sort({_id: -1})
            .limit(LIMIT)
            .skip(startIndex)

        res.status(200).json({
            data: post,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        });

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({$or: [{title}]});
        res.status(200).json({data: posts});
    } catch (err) {
        res.status(404).json({message: `${err.message} --- error in getPostsBySearch controller`});
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);

  } catch (err) {
      res.status(404).json({message: `${err.message} --- error in get single post controller`})
  }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
       await newPost.save();
       res.status(201).json(newPost);
        
    } catch (err) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statusCode(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statusCode(404).send('No post with that id');

    const deletedPost = await PostMessage.findByIdAndRemove(_id);
    res.json({deletedPost, message: 'post was deleted'});
}

export const likePost = async (req, res) => {
    const {id: _id} = req.params;

    if (!req.userId) return res.status(400).json({message: 'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statusCode(404).send('No post with that id');

    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // undo like
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(comment);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.status(200).json(updatedPost);

}


