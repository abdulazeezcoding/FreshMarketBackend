import { Router } from "express";
import { addOrder, deleteAnOrder, getOneOrder, getOrders, updateOrder } from "../controllers/order.controller.js";
// import { adminOnlyRouteMiddleware } from "../middlewares/userAuth.js";

const router = Router();

router.post(
  "/api/order",
  // adminOnlyRouteMiddleware,
  addOrder
);
router.get("/api/order", getOrders);

router.get("/api/order/:id",getOneOrder);
router.patch(
  "/api/order/:id",
  // adminOnlyRouteMiddleware,
  updateOrder

);
router.delete(
  "/api/order/:id",
  // adminOnlyRouteMiddleware,
  deleteAnOrder
);

export default router;
