import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.get(
  "/api/post/show/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      const allPost = await Post.find();
      return res.status(200).json(allPost);
    }
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post not found") as CustomError;
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ sucess: true });
  }
);

export { router as showPostRouter };
