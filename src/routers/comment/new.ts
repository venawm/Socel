import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "src/models/post";

const router = Router();

router.post(
  "/api/comment/new/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, content } = req.body;
    const { postId } = req.params;

    if (!postId) {
      const error = new Error("Post id is required") as CustomError;
      error.status = 400;
      return next(error);
    }

    if (!content) {
      const error = new Error("Title and content are required") as CustomError;
      error.status = 400;
      return next(error);
    }

    const newComment = new Comment({
      content,
      userName: userName ? userName : "Anon",
    });

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment } },
      { new: true }
    );

    try {
      res.status(201).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

export { router as newCommnetRouter };
