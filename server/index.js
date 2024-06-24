const port=4000;
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');

app.use(express.json());
app.use(cors());

//db connection
mongoose.connect('mongodb+srv://mailtoanish2511:1bsJQ3QXQ7ItXQVq@cluster0.w0proe2.mongodb.net/e-commerce');

// image storage
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// creating upload end point for images
const upload=multer({storage:storage});

app.use('/images',express.static('upload/images'));
app.post('/upload',upload.single('product'),(req,res)=>{
     
       res.json({
         success:1,
         image_url:`http://localhost:${port}/images/${req.file.filename}`
       })
});

// schema for the products

const Product=mongoose.model("Product",{
      
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
           type:Date,
           default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    },
});

app.post('/addProduct',async(req,res)=>{
       
    let products=await Product.find(({}));
    let id=1;
    if(products.length>0){

        let lastProduct=products.slice(-1)[0];
        id=lastProduct.id+1;
    }
      const product=new Product(({
          
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price

      }));
      console.log(product);
      await product.save();
      res.json({
        success:true,
        name:req.body.name,
      });
});

// creating api for deleting products

app.post('/removeproduct',async(req,res)=>{
      
    await Product.findOneAndDelete({id:req.body.id});
    res.json({
        success:true,
        name:req.body.name
    });
    console.log('removed');
})

// creating api for getting all products
app.get('/allproducts',async(req,res)=>{
     
    let products=await Product.find({});
    console.log('all product fetched');
    res.send(products);
})

//api creation

app.get('/',(req,res)=>{

    res.send('express is running');
})
app.listen(port,(err)=>{
    
    if(!err){console.log('server is running on port 4000');}else{
         console.log(err);
    }
})