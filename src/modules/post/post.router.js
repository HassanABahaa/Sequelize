import { Router } from "express";
import {
  addPost,
  deletePost,
  updatePost,
  allPost,
  withOwner,
} from "./post.controller.js";

const router = new Router();

// add post
router.post("/", addPost);

// delete post (post creator only )
router.delete("/:id", deletePost);

// update post (post owner only)
router.patch("/:id", updatePost);

// get all posts
router.get("/", allPost);

// get all posts with their owners information
router.get("/posts", withOwner);

export default router;
