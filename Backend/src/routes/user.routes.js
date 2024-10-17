import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single('avatar'), registerUser);
router.route("/login").post(loginUser);

//secure routes

router.route("/logout").get(verifyJWT, logoutUser);

export default router;