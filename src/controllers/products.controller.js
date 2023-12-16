import { Admin } from "../models/admin.js";
import { Products } from "../models/products.js";

class ProductsController {
  async createProduct(req, res) {
    try {
      const { name, category, discription, sastav, ogtagrcum, ml, img, prise } =
        req.body;
      const admin = await Admin.findById(req.user.id);
      const error = {};
      if (!name.trim()) {
        error.name = "write product name";
      }
      if (!category.trim()) {
        error.category = "write category";
      }
      if (!discription.trim()) {
        error.discription = "write the discription";
      }
      if (!sastav.trim()) {
        error.sastav = "write the sastav";
      }
      if (!ogtagrcum.trim()) {
        error.ogtagrcum = " write how use this product";
      }
      if (!img.trim()) {
        error.img = "wher img product";
      }
      if (!prise.trim()) {
        error.prise = "writ the prise please";
      }
      if (Object.keys(error).length) {
        return res.status(400).json({ error });
      }
      const prod = await Products.create({
        name,
        img,
        ogtagrcum,
        category,
        discription,
        sastav,
        ml,
        img,
        prise,
      });
      res.json(prod);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  async getProducts(req, res) {
    const { q = "" } = req.query;
    const prod = await Products.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { discription: { $regex: q, $options: "i" } },
        { sastav: { $regex: q, $options: "i" } },
      ],
    });
    res.json(prod);
  }
  async productsChenge(req, res) {
    const { id } = req.params;
    const { name, category, discription, sastav, ogtagrcum, ml, img, prise } =
      req.body;

    const error = {};
    if (!name.trim()) {
      error.name = "write product name";
    }
    if (!category.trim()) {
      error.category = "write category";
    }
    if (!discription.trim()) {
      error.discription = "write the discription";
    }
    if (!sastav.trim()) {
      error.sastav = "write the sastav";
    }
    if (!ogtagrcum.trim()) {
      error.ogtagrcum = " write how use this product";
    }
    if (!img.trim()) {
      error.img = "wher img product";
    }
    if (typeof prise !== "number") {
      error.prise = "write the prise";
    }
    if (Object.keys(error).length) {
      return res.status(400).json({ error });
    }
    const chenge = await Products.findById(id);

    chenge.name = name;
    chenge.category = category;
    chenge.discription = discription;
    chenge.sastav = sastav;
    chenge.ogtagrcum = ogtagrcum;
    chenge.img = img;
    chenge.ml = ml;
    chenge.prise = prise;
    await chenge.save();
    res.json(chenge);
  }
  async findeone(req, res) {
    const { id } = req.params;
    const prod = await Products.findById(id);
    res.json(prod);
  }
  async bestseller(req, res) {
    const best = await Products.find({}).limit(8);

    res.json(best);
  }
  async randomer(req, res) {
    const count = await Products.countDocuments();
    const random = Math.floor(Math.random() * count);
    const products = await Products.find().skip(random).limit(4);
    res.json(products);
  }
  async deleteproduct(req, res) {
    const { id } = req.params;
    const del = await Products.findByIdAndDelete(id);
    res.json(del);
  }
}

export default new ProductsController();
