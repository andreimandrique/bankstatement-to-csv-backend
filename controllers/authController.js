import jwt from "jsonwebtoken";
import User from "../models/User.js";

const postAuthLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user.password !== password) {
      return res.json({ message: "wrong password" });
    }

    const tokenInfo = { id: user._id, username: username };

    jwt.sign(
      tokenInfo,
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
        algorithm: "HS384",
      },
      (err, token) => {
        if (err) {
          return res
            .status(400)
            .json({ error: "There is an error generating jwt token" });
        }
        res.status(200).json({ token });
      },
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "username does not exist" });
  }
};

const postAuthRegister = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.json({ error: "no username" });
  }

  if (!password) {
    return res.json({ error: "no password" });
  }

  try {
    await User.insertOne({ username, password });
    res.json({ message: "register" });
  } catch (error) {
    console.log(error);
    res.json({ error: "username already taken" });
  }
};

export { postAuthLogin, postAuthRegister };
