const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/lists');
const auth = require('../middleware/auth');

router.post('/', stuffCtrl.createList);
router.get('/', stuffCtrl.getLists);
router.get('/:id', stuffCtrl.getOneList);
router.put('/:id', stuffCtrl.modifyList);
router.delete('/:id', stuffCtrl.deleteList);

module.exports = router;
