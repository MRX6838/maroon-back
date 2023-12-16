import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  category: String,
  discription: String,
  sastav: String,
  ogtagrcum: String,
  ml: [{ type: Number }],
  img: String,
  prise: Number,
});
export const Products = model("products", schema);
