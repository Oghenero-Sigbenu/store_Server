const Product = require("../model/product");
const httpStatus = require("../util/httpStatus");

exports.getProducts = (req, res, next) => {
    Product.findAll({
        include: [
            {
                all: true,
            }
        ]
    })
    .then(products => {
        res.json(products)
    })
    .catch(err => res.json({ msg: err.message || "Cannot fetch data" }))
}

exports.getProductById = (req, res, next) => {
    const productId = req.params.id;
    Product.findOne({
        where: {
            id: productId
        }
    })
    .then(item => {
        if(!item){
            res.status(httpStatus.NOT_FOUND).json({success: false, message: "Product not found"})
        } else {
            res.status(httpStatus.SUCCESS).json(item)   
        }
    })
    .catch(err => res.status(httpStatus.BAD_REQUEST).json({ message: err.message || "Error Occured"}))
}

exports.createProduct = (req, res, next) => {
    const  {name, price, description, category} = req.body;
    let imgUrl;
    if(req.path){
        imgUrl = req.file.path;
        if(!name || !price || !description || !category || !imgUrl){
            res.status(httpStatus.BAD_REQUEST).json({ message: "All fields are required"})
        }else {
            Product.findOne({
                where: {
                    name
                }
            })
            .then(nameExist => {
                if(!nameExist){
                    Product.create({
                        name, price, description, category, imgUrl 
                    })
                    .then(item => {
                        res.status(httpStatus.SUCCESS).json(item)   
                    })
                    .catch(err => res.status(httpStatus.BAD_REQUEST).json({ message: err.message || "Error Occured"}))
                }else {
                     res.status(httpStatus.BAD_REQUEST).json({ message: "Product name already exist"})
                }
            })
            .catch(err => res.status(httpStatus.BAD_REQUEST).json({ message: err.message || "Error Occured"}))
        }
    }      

}

exports.updateProduct = (req, res, next) => {
    const  {name, price, description, category} = req.body;
    let imgUrl;
    const productId = req.params.id; 
    if(req.path){
        imgUrl = req.file.path;
        if(!name || !price || !description || !category || !imgUrl){
            res.status(httpStatus.BAD_REQUEST).json({ message: "All fields are required"})
        }else {
            Product.findOne({
                where: {
                    id: productId
                }
            })
            .then(productExist => {
                if(productExist){
                    Product.update({
                        name, price, description, category, imgUrl 
                    })
                    .then(item => {
                        res.status(httpStatus.SUCCESS).json(item)   
                    })
                    .catch(err => res.status(httpStatus.BAD_REQUEST).json({ message: err.message || "Error Occured"}))
                }else {
                     res.status(httpStatus.BAD_REQUEST).json({ message: "Product name already exist"})
                }
            })
            .catch(err => res.status(httpStatus.BAD_REQUEST).json({ message: err.message || "Error Occured"}))
        }
    }      
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.findByPk(productId)
        .then(item => {
            if(!item){
                res.status(httpStatus.NOT_FOUND).json({ message: "Product does not exist"}) 
            } else {
                item.destroy()
                .then(() => {
                    res.json({success: true, msg: "Product deleted successfully"})
                })
                .catch(err => res.status(httpStatus.BAD_REQUEST).json({ message: err.message || "Error Occured"}) )
            }
        })

}