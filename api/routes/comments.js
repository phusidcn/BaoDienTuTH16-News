const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('INDEX /posts/:id/comments');
});

router.post('/', (req, res, next) => {
  res.send('CREATE /posts/:id/comments');
});

router.get('/:comment_id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/comments/:comment_id/edit');
});

router.put('/:comment_id', (req, res, next) => {
  res.send('UPDATE /posts/:id/comments/:comment_id');
});

router.delete('/:comment_id', (req, res, next) => {
  res.send('DELETE /posts/:id/comments/:comment_id');
});

module.exports = router;
