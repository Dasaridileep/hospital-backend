const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../validators/schemas');


router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
