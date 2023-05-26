import { Router } from "express";
import { createPost, deletePost, getAllPosts, updatePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from '../middleware/file.js'

const route = Router()

route.get('/', verifyToken, getAllPosts)
route.post('/',verifyToken, upload.any('avatar'), createPost)
route.delete('/:postId', verifyToken, deletePost)
route.patch('/:postId', verifyToken, updatePost)

export default route