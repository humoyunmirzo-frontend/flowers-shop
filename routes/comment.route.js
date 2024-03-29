const {Router} = require('express')
const { getCommentsByProductId, createComment, deleteComment } = require('../controllers/comment.controller')

const router = Router()
const {protected, guest} = require('../middlewares/auth')

router.get('/comments/:id',  getCommentsByProductId)
router.post('/create-comment/:id', createComment)
router.post('/delete/:id',protected, deleteComment)

module.exports = router