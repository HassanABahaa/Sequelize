import { Post } from "../../../DB/models/post.model.js";
import { Op } from "sequelize";
import { User } from "../../../DB/models/user.model.js";

// add post
export const addPost = async (req, res) => {
  try {
    await Post.create(req.body, { fields: ["title", "content", "userId"] });
    return res.json({
      success: true,
      msg: "post created successfully!",
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

//delete post (post creator only )
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.json({ msg: "User ID is required" });
    }

    // Use the findOne method to find the post
    const post = await Post.findOne({ where: { id, userId } });

    // Check if the post exists
    if (!post) {
      return res.json({ msg: "Post not found to delete" });
    }

    // Use the destroy method to delete the post
    await post.destroy();

    return res.json({ success: true, msg: "Post deleted successfully" });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

//update post (post owner only)
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, content } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.json({ msg: "User ID is required" });
    } else if (!title || !content) {
      return res.json({ msg: "Title and Content to update is required" });
    }

    // Use the findOne method to find the post
    const post = await Post.findOne({ where: { id, userId } });

    // Check if the post exists
    if (!post) {
      return res.json({ msg: "Post not found to update" });
    }
    // Use the destroy method to update the post
    await post.update({ title, content });

    return res.json({ success: true, msg: "Post updated successfully" });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

// get all posts
export const allPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.json({ success: true, posts });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

export const withOwner = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    return res.json({ success: true, posts });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
