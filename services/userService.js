const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
  createAccessToken,
  createRefreshToken
} = require("../utils/tokens");


// =========================
// REGISTER
// =========================

const createUser = async (data) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    address
  } = data;

  if (!name) {
    throw new Error("User name is required");
  }

  if (!email) {
    throw new Error("User email is required");
  }

  if (!password) {
    throw new Error("User password is required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: "customer",
    phone: phone?.trim(),
    address: address?.trim()
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address
  };
};


// =========================
// LOGIN
// =========================

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken
  };
};


// =========================
// REFRESH
// =========================

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  let decoded;

  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch {
    throw new Error("Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.sub);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken(user);

  user.refreshToken = newRefreshToken;

  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};


// =========================
// LOGOUT
// =========================

const logout = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.sub);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  } catch {
    // Token already invalid/expired
  }
};


// =========================
// UPDATE
// =========================

const updateUser = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const {
    name,
    email,
    password,
    role,
    phone,
    address
  } = data;

  if (name !== undefined) {
    user.name = name.trim();
  }

  if (email !== undefined) {
    const newEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      _id: { $ne: id },
      email: newEmail
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    user.email = newEmail;
  }

  if (password !== undefined) {
    user.password = await bcrypt.hash(password, 10);
  }
 if (role !== undefined) {
    if (!["admin", "customer"].includes(role)) {
      throw new Error("Invalid user role");
    }

    user.role = role;
  }

  if (phone !== undefined) {
    user.phone = phone.trim();
  }

  if (address !== undefined) {
    user.address = address.trim();
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address
  };
};


// =========================
// DELETE
// =========================

const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);

  return user;
};


// =========================
// GET BY ID
// =========================

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address
  };
};


// =========================
// GET ALL
// =========================

const getUsers = async () => {
  return await User
    .find()
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });
};


module.exports = {
  createUser,
  login,
  refreshAccessToken,
  logout,
  updateUser,
  deleteUser,
  getUserById,
  getUsers
};