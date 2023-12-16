import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get("/", createUserValid, function (req, res, next) {
  const users = userService.getAll();
  res.send(JSON.stringify(users));
});

router.get("/:id", function (req, res, next) {
  const user = userService.getById(req.params.id);
  res.send(JSON.stringify(user));
});

router.post("/", createUserValid, function (req, res, next) {
  const user = userService.create(req.body);
  res.send(JSON.stringify(user));
});

router.put("/:id", updateUserValid, function (req, res, next) {
  const user = userService.update(req.params.id, req.body);
  res.send(JSON.stringify(user));
});

router.delete("/:id", function (req, res, next) {
  const resp = userService.delete(req.params.id);
  res.send(JSON.stringify(resp));
});

export { router };
