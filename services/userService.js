import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAll() {
    const users = userRepository.getAll();
    return users;
  }

  getById(userId) {
    const user = this.search({ id: userId })
    return user;
  }

  create(data) {
    const { email, phoneNumber } = data;

    if (userRepository.getOne({ email })) {
      throw new Error(`User with email ${email} already exists!`);
    }

    if (userRepository.getOne({ phoneNumber })) {
      throw new Error(`User with phoneNumber ${phoneNumber} already exists!`);
    }
    
    const user = userRepository.create(data);
    return user;
  }

  update(id, data) {
    const user = userRepository.update(id, data);
    return user;
  }

  delete(id) {
    const user = this.getById(id);
    if (!user) {
      throw Error(`There is no user with id = '${id}'`)
    }
    userRepository.delete(id);
    return user;
  }
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
