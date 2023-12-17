import { fighterRepository } from "../repositories/fighterRepository.js";
import { ValidationError } from '../middlewares/validator/ValidationError.js';

class FighterService {

  getAll() {
    const fighters = fighterRepository.getAll();
    return fighters;
  }

  getById(fighterId) {
    const fighter = this.search({ id: fighterId })

    if (!fighter) {
      throw ValidationError.notFoundError(`Not found fighter with id '${fighterId}'`);
    }
    return fighter;
  }

  create(data) {
    const { name } = data;

    const fighters = this.caseInsencetiveSearch("name", name);
    if (fighters.length) {
      throw new ValidationError(`Fighter with name '${name}' already exists!`);
    }

    return fighterRepository.create(data);
  }

  update(id, data) {
    const { name } = data;

    if (name && this.getAnotherFighterWithName(id, name)) {
      throw new ValidationError(`Fighter with name '${name}' already exists!`);
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    const fighter = this.getById(id);
    if (!fighter) {
      throw ValidationError.notFoundError(`Not found fighter with id '${id}'`);
    }
    fighterRepository.delete(id);
    return fighter;
  }

  caseInsencetiveSearch(field, value) {
    return fighterRepository.dbContext
      .filter(item => item[field].toLowerCase() == value.toLowerCase())
      .value();
  }


  getAnotherFighterWithName(id, name) {
    const fighters = this.caseInsencetiveSearch("name", name);
    return fighters.find(fighter => fighter.id != id);
  }

  search(search) {
    const fighter = fighterRepository.getOne(search);
    if (!fighter) {
      return null;
    }
    return fighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
