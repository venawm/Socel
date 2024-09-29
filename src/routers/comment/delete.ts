import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";

const router = Router();

router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;
    if (!postId || !commentId) {
      const error = new Error("id is required") as CustomError;
      error.status = 400;
      return next(error);
    }
    try {
      await Comment.findByIdAndDelete(commentId);
    } catch (error) {
      next(new Error("Comment not found"));
    }
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });
    res.status(200).json({ sucess: true });
  }
);

export { router as deleteCommentRouter };
