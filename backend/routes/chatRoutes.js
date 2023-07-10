const express = require('express');
const protect = require('../middleware/authorizeMiddleware');

const router = express.Router();

// router.post('/', protect, accessChat);
// router.get('/', protect, fetchChats);
// router.post('/group', protect, createGroupChat);
// router.put('/rename', protect, renameGroup); 
// router.put('/remove-from-group', protect, removeFromGroup);
// router.put('/add-to-group', protect, addToGroup);

module.exports = router;