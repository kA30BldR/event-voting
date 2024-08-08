import { check } from 'express-validator';

export const registerValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  check('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
];

export const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];
