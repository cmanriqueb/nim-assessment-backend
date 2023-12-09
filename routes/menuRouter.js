const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);
// 1C
menuRouter.get("/search", menuController.search);
menuRouter.get("/:id", menuController.getOne);
menuRouter.post("/", menuController.create);
// 1A
menuRouter.put("/:id", menuController.update);
// 1B
menuRouter.delete("/:id", menuController.deleteItem);



module.exports = menuRouter;
