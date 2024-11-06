import { Router } from "express";
import { createCar, deleteCar, getAllCar, getCar, updateCar } from "../controller/carController.js";

const carRouter = Router();

carRouter.route("/").get(getAllCar).post(createCar);;
carRouter.route("/:id").get(getCar).patch(updateCar).delete(deleteCar);

export default carRouter;