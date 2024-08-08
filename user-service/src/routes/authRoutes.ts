import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import { validateRequest } from "../middleware/validationMiddleware";
import {
  registerValidation,
  loginValidation,
} from "../validators/authValidators";
import JwtService from "../services/jwt.service";

const router = Router();

// Register Route
router.post(
  "/register",
  registerValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name }: IUser = req.body;

    try {
      let user: IUser | null = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({
        email,
        password,
        name,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { userId: user.id };
      const token = JwtService.generateToken(payload);

      res.json({ token, ...payload });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        res.status(500).send({ error: err });
      } else {
        res.status(500).send("Unknown server error");
      }
    }
  }
);

// Login Route
router.post(
  "/login",
  loginValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    try {
      let user: IUser | null = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const payload = { userId: user.id };
      const token = JwtService.generateToken(payload);

      res.json({ token, ...payload });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        res.status(500).send("Server error");
      } else {
        res.status(500).send("Unknown server error");
      }
    }
  }
);

// Verify Route
router.post("/verify", (req: Request, res: Response) => {
  const token = req.header("Authorization") || "";

  const payload = JwtService.verifyToken(token);

  if (payload) {
    return res.json({ valid: true, payload });
  } else {
    return res.status(403).json({ valid: false, message: "Invalid token" });
  }
});

export default router;
