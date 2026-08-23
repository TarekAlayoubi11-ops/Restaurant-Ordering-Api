const userService = require("../services/userService");


// REGISTER
const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};


// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await userService.login(
      email,
      password
    );

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      accessToken: result.accessToken
    });
  } catch (error) {
    next(error);
  }
};


// REFRESH
const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const result =
      await userService.refreshAccessToken(refreshToken);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      accessToken: result.accessToken
    });
  } catch (error) {
    next(error);
  }
};


// LOGOUT
const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await userService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};


// GET ALL
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};


// GET BY ID
const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(
      req.params.id
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


// UPDATE
const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


// DELETE
const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createUser,
  login,
  refresh,
  logout,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};