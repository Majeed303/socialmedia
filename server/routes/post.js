import  express  from "express";
import {getfeedPosts , getUserPosts , likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

 const router = express.Router();

// REad
router.get("/" , verifyToken ,getfeedPosts);
router.get("/:userId/posts" , verifyToken ,getUserPosts);


//uptate
router.patch("/:id/like",verifyToken , likePost);

export default router;