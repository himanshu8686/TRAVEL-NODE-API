const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('../Models/Product.model');

/**
 *  Image is saved on DropZone
 */
exports.imageUpload = async (req, res, next) =>
{
   try {
    res.send({
        "success":true,
        "message":"Image Uploaded succesfully",
        "image":res.req.file.path,
        "fileName":res.req.file.filename
    })
   } catch (error) {
    console.log(error.message);
    next(error)
   }
};


/**
 *  A product with image is saved
 */
exports.productUpload = async (req, res, next) =>
{
   try {
        const product= new Product(req.body)
        const result = await product.save();
        res.send({
            "success": true,
            "message": "Product created successfully",
            result
        });
   } catch (error) {
    console.log(error.message);
        // this Validation error comes from mongoose
        if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
        }
        next(error);
   }
};

exports.getAllProducts = async (req,res,next)=>{
    try {
        const results = await Product.find({}, {
                __v: 0 // field to be omitted 0 here is for remove 1 is for retained
            })
            .populate('writer', {
                __v: 0
            }); // populate fills the writer(from product schema 'writer') object in Products object
        if (results.length > 0) {
            res.send({
                "response_code": 200,
                "message": "All Products fetched successfully",
                "total_results": results.length,
                results
            });
        } else {
            res.status(404).json({
                "response_code": 404,
                "message": "No Products to display",
            });
        }
    } catch (error) {
        console.log(error.message);
        next(createError(res.status, error.message));
    }
}



