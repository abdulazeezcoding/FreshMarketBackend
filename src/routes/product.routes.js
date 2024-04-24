import { Router } from "express";
import { ProductModel } from "../models/productModel.js";
// import { adminOnlyRouteMiddleware } from "../middlewares/userAuth.js";

const router = Router();

router.post(
  "/api/product",
  // adminOnlyRouteMiddleware,
  async (req, res, next) => {
    try {
      const createProduct = await ProductModel.create(req.body);

      if (!createProduct) {
        const error = new Error(
          "Fields required"
        );
  
        error.statusCode = 404;
  
        return next(error);
      }

      res.status(201).json(createProduct);
    } catch (error) {
      next(error);
    }
  }
);
router.get("/api/product", async (req, res, next) => {
  try {
    const getProduct = await ProductModel.find();

    if (!getProduct) {
        const error = new Error(
          "Not Found"
        );
  
        error.statusCode = 404;
  
        return next(error);
      }

    res.status(200).json(getProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/api/product/:id", async (req, res, next) => {
  try {
    const getByIdProduct = await ProductModel.findById(req.params.id)
    if (!getByIdProduct) {
        const error = new Error(
          `Can't find product with the id of ${req.params.id}`
        );
  
        error.statusCode = 404;
  
        return next(error);
      } 
    res.status(200).json(getByIdProduct);
  } catch (error) {
    next(error);
  }
});
router.patch(
  "/api/product/:id",
  // adminOnlyRouteMiddleware,
  async (req, res, next) => {
    try {
      const updateByIdProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (!updateByIdProduct) {
        const error = new Error(
          `Can't find product with the id of ${req.params.id}`
        );
  
        error.statusCode = 404;
  
        return next(error);
      }

      res.json(updateByIdProduct);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/api/product/:id",
  // adminOnlyRouteMiddleware,
  async (req, res, next) => {
    try {
      const getByIdAndDeleteProduct = await ProductModel.findByIdAndDelete(
        req.params.id
      );

      if (!getByIdAndDeleteProduct) {
        const error = new Error(
          `Can't find product with the id of ${req.params.id}`
        );
  
        error.statusCode = 404;
  
        return next(error);
      }
      
      res.status(200).json(getByIdAndDeleteProduct);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
