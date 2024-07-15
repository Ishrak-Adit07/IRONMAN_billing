import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import {
  createDocument,
  deleteDocument,
  findDocument,
} from "../database/appwrite.queries.js";
dotenv.config();

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_WEB_KEY, { expiresIn: "10d" });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("register", req.body);
  // let name= req.username;
  try {
    if (!username || !password) {
      res.status(404).send({ success: false, error: "All fields required" });
    } else {
      const exist = await findDocument(
        process.env.APPWRITE_USER_COLLECTION_ID,
        "name",
        username
      );
      if (exist.response.total != 0) {
        res
          .status(404)
          .send({ success: false, error: "Name is already in use" });
      } else {
        const hashedPassword = await encryptPassword(password);
        const userData = {
          username,
          password: hashedPassword,
        };

        const registerResponse = await createDocument(
          process.env.APPWRITE_USER_COLLECTION_ID,
          userData
        );
        const webToken = createToken(registerResponse.$id);
        res.status(201).send({ success: true, username, webToken });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    res.status(404).send({ success: false, error: "All fields are required" });
  }

  try {
    const user = await findDocument(
      process.env.APPWRITE_USER_COLLECTION_ID,
      "name",
      username
    );
    if (user.response.total === 0) {
      res.status(404).send({ success: false, error: "No such user found" });
    } else {
      const match = await bcrypt.compare(
        password,
        user.response.documents[0].password
      );
      if (!match) {
        res.status(404).send({ success: false, error: "Invalid Credentials" });
        console.log("Invalid Credentials");
      } else {
        const webToken = createToken(user.response.documents[0].$id);
        res.status(201).send({ success: true, username, webToken });
        console.log("User logged in");
      }
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ success: false, error: e.message });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(404).send({ success: false, error: "Name is required" });
  }

  try {
    const user = await findDocument(
      process.env.APPWRITE_USER_COLLECTION_ID,
      "name",
      username
    );
    if (user.response.total === 0) {
      res.status(404).send({ success: false, error: "No such user found" });
    } else {
      const deleteUserResponse = await deleteDocument(
        process.env.APPWRITE_USER_COLLECTION_ID,
        user.response.documents[0].$id
      );
      res
        .status(201)
        .send({ success: true, message: "User " + username + " is deleted" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ success: false, error: e.message });
  }
};

export { registerUser, loginUser, deleteUser };
