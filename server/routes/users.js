import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { getUser } from "../controllers/user.js";
import { getUserFriends } from "../controllers/user.js";
import { addRemoveFriend } from "../controllers/user.js";
import { editusers } from "../controllers/user.js";

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends",verifyToken , getUserFriends);
router.post("/Edituser" ,verifyToken , editusers);

//update
router.patch("/:id/:friendId",verifyToken, addRemoveFriend);

export default router;