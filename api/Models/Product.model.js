const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
   writer:{
       type:mongoose.Schema.Types.ObjectId,
       ref: 'User', // will bind User
   },
   productTitle:{
       type:String,
       maxlength:50
   },
   productDescription:{
    type:String
   },
   productPrice:{
    type:Number,
    default:0
   },
   Images:{
       type:Array,
       default:[]
   },
   continents:{
        type:Number,
        default:1
   },
   sold:{
       type:Number,
       maxlength:100,
       default:0
   },
   views:{
       type:Number,
       default:0
   }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;