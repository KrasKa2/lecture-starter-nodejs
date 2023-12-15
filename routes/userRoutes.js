import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get('/', function(req, res, next) {
  const users = userService.getAll();
  res.send(JSON.stringify(users));
});

router.get('/:id', function(req, res, next) {
  const user = userService.getById(req.params.id);
  res.send(JSON.stringify(user));
});

router.post('/', function(req, res, next) {
  const user = userService.create(req.body);
  res.send(JSON.stringify(user));
});

router.put('/:id', function(req, res, next) {
  const user = userService.update(req.params.id, req.body);
  res.send(JSON.stringify(user));
});


router.delete('/:id', function(req, res, next) {
  const resp = userService.delete(req.params.id);
  res.send(JSON.stringify(resp));
});
/**
{
  "name": "User0",
  "email": "user0@gmail.com",
  "id": "000",
  "createdAt": "2023-12-15T10:23:31.888Z",
  "updatedAt": "2023-12-15T13:28:09.946Z"
},
 */

export { router };
