import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
});

export const Admin = model("admin", schema);
