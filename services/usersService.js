const User = require("../models/user");
const IdentityCounter = require("../models/identityCounter");

module.exports = class UsersService {
  static async seedDatabase(n = 10) {
    try {
      await IdentityCounter.findOneAndUpdate({ name: "user" }, { $set: { idx: 1 } });

      const lorem =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          .replace(/(\.|,)/g, "")
          .toLowerCase()
          .split(" ");

      console.log("Seeding database...");

      for (let i = 0; i < n; i++) {
        const user = {
          firstName: lorem[Math.floor(Math.random() * lorem.length)],
          lastName: lorem[Math.floor(Math.random() * lorem.length)],
          age: Math.floor(Math.random() * 100),
        };

        await this.createNewUser(user);
      }

      this.getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUsers(query = "", page = 1) {
    const perPage = 25;

    try {
      const regexQuery = `.*${query}.*`;

      let allUsers = await User.find({
        $or: [
          { firstName: { $regex: regexQuery, $options: "i" } },
          { lastName: { $regex: regexQuery, $options: "i" } },
        ],
      })
        .limit(25)
        .skip(perPage * (page - 1));

      // if (allUsers.length === 0) {
      //   await this.seedDatabase(100);
      //   allUsers = await User.find({});
      // }

      return allUsers;
    } catch (error) {
      console.log(error);
    }
  }

  static async createNewUser(data) {
    try {
      let idx = await IdentityCounter.findOne({ name: "user" });

      if (idx === null) {
        idx = await new IdentityCounter({ name: "user" }).save();
      }

      data.id = idx.idx;

      await IdentityCounter.findOneAndUpdate({ name: "user" }, { $inc: { idx: 1 } });

      const response = await new User(data).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(id, data) {
    try {
      const response = await User.findByIdAndUpdate(
        id,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
        },
        { new: true }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(id) {
    try {
      const response = await User.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAllUsers() {
    try {
      const response = await User.deleteMany({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
