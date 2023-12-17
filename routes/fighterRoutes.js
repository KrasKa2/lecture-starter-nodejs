import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";


const router = Router();


router.get("/", function (req, res, next) {
  const fighters = fighterService.getAll();
  res.send(fighters);
  next();
});

router.get("/:id", function (req, res, next) {
  const fighter = fighterService.getById(req.params.id);
  res.send(fighter);
  next();
});

router.post("/", createFighterValid, function (req, res, next) {
  const fighter = fighterService.create(req.body);
  res.send(fighter);
  next();
});

router.put("/:id", updateFighterValid, function (req, res, next) {
  const user = fighterService.update(req.params.id, req.body);
  res.send(user);
  next();
});

router.delete("/:id", function (req, res, next) {
  const user = fighterService.delete(req.params.id);
  res.send(user);  
  next();
});

router.use(responseMiddleware);

export { router };
