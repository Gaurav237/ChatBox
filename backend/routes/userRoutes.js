const express = require('express');
const { registerUser, authenticateUser, allUsers } = require('../controllers/userControllers');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authenticateUser);
router.get('/', allUsers);

module.exports = router;