const express = require('express');
const router = express.Router();

router.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example endpoint' });
});

module.exports = router;