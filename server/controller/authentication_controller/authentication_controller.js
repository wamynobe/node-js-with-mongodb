import * as randToken from "rand-token";
import mongoose from "mongoose";
import User from "../../models/user_model/user_model.js";
import * as bcrypt from "bcrypt";
import * as authMethod from "../authentication_controller/authentication_methods.js";

export async function register(req, res) {
  try {
    const username = req.body.user_name.toLowerCase();
    const user = await User.findOne({ user_name: username });
    if (user != null) res.status(409).send("Account already existed");
    else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        user_name: username,
        password: hashPassword,
      });
      return user.save().then((newUser) => {
        return res.status(201).json({
          success: true,
          message: "Create new user successfully",
          user_name: newUser.user_name,
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const username = req.body.user_name.toLowerCase();
    const password = req.body.password;
    const user = await User.findOne({ user_name: username });
    if (user == null) res.status(401).send("Wrong password or user name");
    else {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send("Wrong password or user name");
      }
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      const dataForAccessToken = {
        user_name: user.user_name,
      };
      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
      );
      if (!accessToken) {
        return res
          .status(401)
          .send("Login not successfully, please try again later.");
      }

      let refreshToken = randToken.generate(100);
      if (!user.refresh_token) {
        const userUpdate = new User({
          _id: user._id,
          user_name: user.user_name,
          password: user.password,
          token: accessToken,
          refresh_token: refreshToken,
        });
       await user.update({ $set: userUpdate }).exec();
      } else {
        refreshToken = user.refresh_token;
      }
      const name = user.user_name;
      return res.json({
        msg: "Login successfully",
        accessToken,
        refreshToken,
        name,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}
