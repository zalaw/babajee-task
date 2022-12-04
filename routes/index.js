const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/usersController");

router.get("/api/users", UsersController.apiGetAllUsers);
router.post("/api/users", UsersController.apiCreateNewUser);
router.put("/api/users/:id", UsersController.apiUpdateUser);
router.delete("/api/users/:id", UsersController.apiDeleteUser);
router.delete("/api/users", UsersController.apiDeleteAllUsers);

module.exports = router;
