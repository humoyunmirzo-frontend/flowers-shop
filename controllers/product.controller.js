const db = require('../models/index')
const Product = db.product

// get admin dashboard
const getAdminDashboard = async (req, res) => {
    try {
        res.render('admin-panel/dashboard', {
            title: 'Dashboard'
        })
    } catch (error) {
        console.log(error);
    }
}

// get products page

const getProductsPage = async (req, res) => {
    try {
        const products = await Product.findAll({ 
            raw: false,
            nest:true,
            plain:false,
            include:['comments']
        });
        console.log(products); 
        res.render('admin-panel/products', {
            title: "Mahsulotlar",
            products
        })
    } catch (error) {
        console.log(error);
    }
}


// get view single product page
const getUserInterfaceAndProducts = async (req, res) => {
    try {
        const products = await Product.findAll(
            {
                raw:true,
                
            }
            )
        res.render('home/home', {
            title: 'Product',
            products
        })
    } catch (error) {
        console.log(error);
    }
}
const getSingleProductAndPage = async(req,res)=>{
    try {
        const product = await Product.findByPk(req.params.id,{
            raw:false,
            plain:true,
            nest:true,
            include:['comments']
            })

            res.render('home/single-product', {
                product:product,
                id:req.params.id 
            })
    } catch (error) {
        console.log(error);
    }
}
// get product by id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id,{
            include:['comment'],
            raw:true,
            nest:true,
        })
        console.log(product);
        res.send({ product })
    } catch (error) {
        console.log(error);
    }
}

// create product
const createProduct = async (req, res) => {
    try {
        const { title, description, amount } = req.body
        console.log(title, description, amount, req.file);
        const fileUrl = req.file ? '/uploads/' + req.file.filename : ''
        await Product.create(
            {
                title,
                image: fileUrl,
                description,
                amount
            }
        )
        res.status(201).redirect('/admin/dashboard/products')
    } catch (error) {
        console.log(error);
    }
}
// update product
const updateProduct = async (req, res) => {
    try {
        const { title, description, amount } = req.body
        console.log(title, description, amount, req.file);
        const fileUrl = req.file ? '/uploads/' + req.file.filename : ''
        await Product.update(
            {
                title,
                image: fileUrl,
                description,
                amount
            },
            {
                where: { id: req.params.id },
                raw: true
            },
        )
        res.redirect('/admin/dashboard/products')
    } catch (error) {
        console.log(error);
    }
}
// delete product
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const isExistProduct = await Product.findByPk(id)
        isExistProduct && await Product.destroy({ where: { id } })
        res.redirect('/admin/dashboard/products')
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAdminDashboard,
    getProductsPage,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getUserInterfaceAndProducts,
 getSingleProductAndPage 
    
}