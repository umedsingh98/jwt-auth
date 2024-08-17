import  express from "express";
import signupValidation from "../middlewares/authMiddleware.js";
import loginValidation from "../middlewares/authMiddlewareLogin.js";
import signup from "../controller/authController.js";
import login from "../controller/authControllerLogin.js";


const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
export default router;