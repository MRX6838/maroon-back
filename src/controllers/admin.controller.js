import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";

const PASSWORD_LENGTH = 6;
const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
class AdminController {
  async registration(req, res) {
    const { name, surname, password, email, confirm } = req.body;
    const error = {};
    const mail = await Admin.findOne({ email });

    if (mail) {
      error.email = "this email is used ";
    }
    if (!EMAIL_REGEXP.test(email)) {
      error.email = "write correct email";
    }
    if (!name.trim()) {
      error.name = "what is your name";
    }
    if (!surname.trim()) {
      error.surname = "what is your surname";
    }
    if (password.length < PASSWORD_LENGTH) {
      error.password = "your password is wrong";
    }
    if (password !== confirm) {
      error.confirm = "your password or confirm is wrong ";
    }
    if (Object.keys(error).length) {
      return res.status(400).json({ error });
    }
    const hash = bcrypt.hashSync(password, 8);

    const admin = await Admin.create({
      name,
      surname,
      password: hash,
      email,
    });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  }
  async login(req, res) {
    const { email, password } = req.body;
    const finde = await Admin.findOne({ email });

    if (!finde) {
      return res.status(400).json({ message: "E-mail is wrong" });
    }

    const isFind = bcrypt.compareSync(password, finde.password);

    if (!isFind) {
      return res.status(400).json({
        message: "password is wrong",
      });
    }

    const token = jwt.sign({ id: finde._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  }

  async findMe(req, res) {
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    return res.json(admin);
  }
}

export default new AdminController();
