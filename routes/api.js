//routes
const express = require('express');

const router = express.Router();

const courseRoutes = require('./course');
router.use('/courses', courseRoutes);

const userRoutes = require('./user');
router.use('/user', userRoutes);

module.exports = router;