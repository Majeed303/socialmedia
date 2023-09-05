import  express  from "express";
import {getfeedPosts , getUserPosts , likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { comment } from "../controllers/posts.js";

 const router = express.Router();

// REad
router.get("/" , verifyToken ,getfeedPosts);
router.get("/:userId/posts" , verifyToken ,getUserPosts);
router.post("/:id/comment" ,verifyToken , comment)

//uptate
router.patch("/:id/like",verifyToken , likePost);

export default router;