import { OrderModel } from "../models/order.model.js";

export const addOrder =  async (req, res, next) => {
  try {
    const createOrder = await OrderModel.create(req.body);

    if (!createOrder) {
      const error = new Error(
        "Fields required"
      );

      error.statusCode = 404;

      return next(error);
    }

    res.status(201).json(createOrder);
  } catch (error) {
    next(error);
  }
}

 export const getOrders =  async (req, res, next) => {
  try {
    const getOrder = await OrderModel.find();

    if (!getOrder) {
        const error = new Error(
          "Not Found"
        );
  
        error.statusCode = 404;
  
        return next(error);
      }

    res.status(200).json(getOrder);
  } catch (error) {
    next(error);
  }
}
    export const getOneOrder =  async (req, res, next) => {
      try {
        const getByIdOrder = await OrderModel.findById(req.params.id)
        if (!getByIdOrder) {
            const error = new Error(
              `Can't find Order with the id of ${req.params.id}`
            );
      
            error.statusCode = 404;
      
            return next(error);
          } 
        res.status(200).json(getByIdOrder);
      } catch (error) {
        next(error);
      }
    }
  
   export const updateOrder = async (req, res, next) => {
    try {
      const updateByIdOrder = await OrderModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (!updateByIdOrder) {
        const error = new Error(
          `Can't find Order with the id of ${req.params.id}`
        );
  
        error.statusCode = 404;
  
        return next(error);
      }

      res.json(updateByIdOrder);
    } catch (error) {
      next(error);
    }
  }
   
   
  
    export const deleteAnOrder = async (req, res, next) => {
      try {
        const getByIdAndDeleteOrder = await OrderModel.findByIdAndDelete(
          req.params.id
        );
  
        if (!getByIdAndDeleteOrder) {
          const error = new Error(
            `Can't find Order with the id of ${req.params.id}`
          );
    
          error.statusCode = 404;
    
          return next(error);
        }
        
        res.status(200).json(getByIdAndDeleteOrder);
      } catch (error) {
        next(error);
      }
    }