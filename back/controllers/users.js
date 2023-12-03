import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modules/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Password is not correct" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" },
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong in signin controller" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: newUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
