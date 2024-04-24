import { Router, json } from "express";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import  UserModel  from "../models/userModel.js";
import { ProductModel } from "../models/productModel.js";
import { OrderModel } from "../models/order.model.js";

export const router = Router();

// register route
router.post("/users", async (req, res, next) => {
    try {
        // add user to database
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;
       
        const registerResult = await UserModel.create(req.body);
        res.status(201).json(registerResult);
        console.log('data:', registerResult);

    } catch (error) {
        next(error);
    }
});

// Fetch all users
router.get("/users", async (req, res, next) => {
    try {
        const fetchUsersResult = await UserModel.find();
        res.status(200).json(fetchUsersResult);
    } catch (error) {
        next(error);
    }
});


// Login a user
router.post("/users/login", async (req, res, next) => {
    console.log(req.body)

    try {
        // attempt to login
        const loginResult = await UserModel.findOne( {email: req.body.email}).exec();
        console.log(loginResult);
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            loginResult.password,
          );
        
          if (isPasswordMatch === false) {
            console.log("Error: Invalid credentials");
          }

        // Token generation
        const token = Jwt.sign({id: loginResult._id}, "secretKey");

        console.log(token);

          res.status(201).json({token: token})
      
    } catch (error) {
        res.status(500).json({message: error});
        next(error);
    }
});

// Logout a user
router.delete('/users/logout', (req, res, next)=> {
    if(req.session) {
        req.session.destroy(error => {
            if (error) {
                next(error);
                res.status(400).json({message: 'Unable to log out'});
            } else {
                res.json({message: 'Logout successful'});
            }
        });
    } else {
        // res.json({message: 'something'});
        res.end();
    }
});

router.get('/counts', async (req, res, next)=> {
    try {
        const userCount = await UserModel.countDocuments();
        const orderCount = await OrderModel.countDocuments();
        const productCount = await ProductModel.countDocuments();

        res.status(200).json({userCount, orderCount, productCount});
    } catch (error) {
        console.log('error for totalusers:', error);
        res.status(500).json({error: 'Internal Server Error'});
        next(error)
    }
});