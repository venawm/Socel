import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.put(
  "/api/post/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      const error = new Error("Id is required") as CustomError;
      error.status = 400;
      return next(error);
    }

    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post not found") as CustomError;
      error.status = 404;
      return next(error);
    }

    if (!title || !content) {
      const error = new Error("Title and content are required") as CustomError;
      error.status = 400;
      return next(error);
    }

    try {
      post.title = title;
      post.content = content;
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
);

export { router as updatePostRouter };
