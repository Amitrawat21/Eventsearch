import express from "express";
import { register , login, verifyOTP} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);

export default router;
