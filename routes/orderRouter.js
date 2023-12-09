const { Router } = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.get("/", orderController.getAll);
// 2A
orderRouter.get("/total-sales", orderController.totalSales);
// 2B
orderRouter.get("/status", orderController.getStatusWithDateRange)
orderRouter.get("/:id", orderController.getOne);
orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);



module.exports = orderRouter;
