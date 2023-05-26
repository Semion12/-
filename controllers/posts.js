import { Post } from "../modules/post.js"
import { User } from "../modules/user.js"

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        const limit = 20
        let pageCount = Math.ceil(posts.length / limit)
        let currentPage = parseInt(req.query.page)
        if (!currentPage) {
            currentPage = 1
        }
        if (currentPage > pageCount) {
            currentPage = pageCount
        }
        res.status(200).json({ posts: posts.slice(currentPage * limit - limit, currentPage * limit) })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createPost = async (req, res) => {
    try {
        const { description, userId } = req.body
        const user = await User.findById(userId)
        if (!user) {
            res.status(404).send('вы не зарегистрированы')
        }
        const newPost = new Post({
            description,
            userId,
            nickname: user.nickname,
        })

        await newPost.save()
        const posts = await Post.find()
        return res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        await Post.findByIdAndDelete(postId)

        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({msg:error})
    }


}

export const updatePost = async (req, res) => {
    try {
        const { description } = req.body
        const { postId } = req.params

        await Post.findByIdAndUpdate(postId, { description })
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}