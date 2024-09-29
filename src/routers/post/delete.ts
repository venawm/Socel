import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.delete(
  "/api/post/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      const error = new Error("id is required") as CustomError;
      error.status = 400;
      return next(error);
    }
    try {
      await Post.findByIdAndDelete(id);
    } catch (error) {
      next(new Error("Post not found"));
    }
    res.status(200).json({ sucess: true });
  }
);

export { router as deletePostRouter };
