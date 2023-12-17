import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", function (req, res, next) {
  const users = userService.getAll();
  res.send(users);
  next();
});

router.get("/:id", function (req, res, next) {
  const user = userService.getById(req.params.id);
  res.send(user);
  next();
});

router.post("/", createUserValid, function (req, res, next) {
  const user = userService.create(req.body);
  res.send(user);
  next();
});

router.put("/:id", updateUserValid, function (req, res, next) {
  const user = userService.update(req.params.id, req.body);
  res.send(user);
  next();
});

router.delete("/:id", function (req, res, next) {
  const user = userService.delete(req.params.id);
  res.send(user);
  next();
});

router.use(responseMiddleware);

export { router };
