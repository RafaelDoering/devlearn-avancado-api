//routes
const express = require('express');

const courseController = require('../controllers/course');

const router = express.Router();

router.get('/:id', courseController.get);

router.get('/', courseController.gets);

router.post('/', courseController.create);

router.put('/:id', courseController.edit);

router.delete('/:id', courseController.delete);

module.exports = router;