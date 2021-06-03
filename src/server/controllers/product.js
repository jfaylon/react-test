const { createTagArray, validateProduct } = require("../services/product");
const ProductModel = require("../models/product");
const test = (req, res) => {
  res.json(200);
};

const createProduct = async (req, res) => {
  // validate input
  const { body } = req;

  const validationErrors = validateProduct(body);
  if (validationErrors.length > 0) {
    return res.status(400).json({
      errors: validationErrors
    });
  }

  if (body.tags) {
    body.tags = createTagArray(body.tags);
  }
  const product = new ProductModel(body);
  await product.save();
  const responseArray = [];
  const responseData = {};
  responseData.data = product;
  responseArray.push(responseData);
  return res.status(201).json(responseArray);
};

const getProduct = async (req, res) => {
  const { params } = req;
  try {
    const product = await ProductModel.findById(params.id);
    if (!product) {
      return res.status(400).send("Bad Request");
    }
    return res.status(200).json({
      data: product
    });
  } catch (error) {}
};

const editProduct = async (req, res) => {
  const { params, body } = req;
  const validationErrors = validateProduct(body);
  if (validationErrors.length > 0) {
    return res.status(400).json({
      errors: validationErrors
    });
  }
  try {
    const product = await ProductModel.findByIdAndUpdate(params.id, body, {
      new: true
    });
    return res.status(200).json({
      data: product
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteProduct = async (req, res) => {
  const { params } = req;
  try {
    const product = await ProductModel.findByIdAndDelete(params.id);
    const deletedId = product.id;
    const data = [];
    if (deletedId) {
      data.push(deletedId);
      return res.status(200).json({
        data
      });
    } else {
      return res.status(400).send("Bad Request");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  return res.status(200).json({
    data: products
  });
};

module.exports = {
  test,
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
  getAllProducts
};
