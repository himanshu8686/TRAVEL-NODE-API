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
    let order= req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip= parseInt(req.body.skip);

    let findArgs = {};

    console.log(req.body.filters)

    for (let key in req.body.filters) 
    {
        if (req.body.filters[key].length > 0) {
           // console.log("keys",req.body.filters[key])
            if( key === "productPrice")
            {
                findArgs[key] ={
                    $gte: req.body.filters[key][0],
                    $lte:req.body.filters[key][1]
                }
            }else{
            findArgs[key] = req.body.filters[key];
            }
        }
    }
    try {
        console.log(findArgs)
        const results = await Product.find(findArgs, {
                __v: 0 // field to be omitted 0 here is for remove 1 is for retained
            })
            .populate('writer', {
                __v: 0
            }) // populate fills the writer(from product schema 'writer') object in Products object
            .sort([[sortBy,order]])
            .skip(skip)
            .limit(limit); 

        if (results.length > 0) {
            res.send({
                "success":true,
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



