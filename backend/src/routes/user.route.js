import { Router } from "express";
import { userRegisterValidator,userLoginValidator } from "../validators/user.validator.js";
import { validate } from "../validators/validate.js";
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

// unsecure routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router 