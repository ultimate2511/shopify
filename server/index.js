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
         image_url:`https://shopify-backend-gezh.onrender.com/images/${req.file.filename}`
       })
});

// Schema for creating user model
const Users = mongoose.model("Users", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now() },
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


// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id
          }
        }
        success = true;
        console.log(user.id);
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success, token });
      }
      else {
        return res.status(400).json({ success: success, errors: "please try with correct email/password" })
      }
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  })
//Create an endpoint at ip/auth for regestring the user & sending auth-token
app.post('/signup', async (req, res) => {
    console.log("Sign Up");
    let success = false;
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "existing user found with this email" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();
    const data = {
      user: {
        id: user.id
      }
    }
  
    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token })
  });

  // MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};
  
// Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
    console.log("Add Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
  });
  
  
  // Create an endpoint for removing the product in cart
  app.post('/removefromcart', fetchuser, async (req, res) => {
    console.log("Remove Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] != 0) {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
  })
  
  
  //Create an endpoint for getting cartdata of user
  app.post('/getcart', fetchuser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  
  })
;

// endpoint for getting womens products data
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let arr = products.splice(0, 4);
  console.log("Popular In Women");
  res.send(arr);
});

    
// endpoint for getting latest products data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(0).slice(-8);
  console.log("New Collections");
  res.send(arr);
});

app.post('/addProduct',async(req,res)=>{
       
    let products=await Product.find({});
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