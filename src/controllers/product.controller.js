import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json({ success: true, product: p });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { q, tag, category, limit = 20, skip = 0 } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (tag) filter.tags = tag;
    if (category) filter.categoryId = category;

    const products = await Product.find(filter).skip(parseInt(skip)).limit(parseInt(limit));
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, product: p });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, product: p });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
