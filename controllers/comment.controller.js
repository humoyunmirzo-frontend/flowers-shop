const db = require('../models/index')
const Comment = db.comment

// get comments by productId
const getCommentsByProductId = async (req, res) => {
    {
        try {
            const id = req.params.id

            const comments = await Comment.findAll(
                { where: { productId: id } }
            )

            return res.send({
                comments
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// create comment

const createComment = async (req, res) => {
    try {
        const { email, text, productId } = req.body
        await Comment.create({ email, text, productId })
        res.redirect(`/products/${productId}`)
    } catch (error) {
        console.log(error);
    }
}

// delete comment

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id
        const isExistComment = await Comment.findByPk(id)
        isExistComment && await Comment.destroy({ where: { id } })
        res.redirect('/admin/dashboard/products')
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getCommentsByProductId,
    createComment,
    deleteComment
}