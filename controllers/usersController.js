const UsersService = require("../services/usersService.js");

module.exports = class UsersController {
  static async apiGetAllUsers(req, res, next) {
    try {
      const { query, page } = req.query;

      const allUsers = await UsersService.getAllUsers(query, page);
      res.json(allUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  static async apiCreateNewUser(req, res, next) {
    try {
      const createdUser = await UsersService.createNewUser(req.body);
      res.json(createdUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const updatedUser = await UsersService.updateUser(req.params.id, req.body);
      if (!updatedUser) return res.status(404).json("User not found");
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      const response = await UsersService.deleteUser(req.params.id);
      if (!response) return res.status(404).json("User not found");
      res.json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async apiDeleteAllUsers(req, res, next) {
    try {
      const response = await UsersService.deleteAllUsers();
      res.json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
