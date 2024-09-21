import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.post(
  "/api/post/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
    });
    if (!title || !content) {
      const error = new Error("Title and content are required") as CustomError;
      error.status = 400;
      return next(error);
    }

    try {
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
);

export { router as newPostRouter };
