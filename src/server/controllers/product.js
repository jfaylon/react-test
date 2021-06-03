const isEmpty = require("lodash/isEmpty");
const { createTagArray, validateProduct } = require("../services/product");
const ProductModel = require("../models/product");
const test = (req, res) => {
  res.json(200);
};

const createProduct = async (req, res) => {
  // validate input
  const { body } = req;
  if (body.tags) {
    body.tags = createTagArray(body.tags);
  }
  const validationErrors = validateProduct(body);
  if (validationErrors && validationErrors.length > 0) {
    res.status(400);
    return res.json({
      errors: validationErrors
    });
  }
  try {
    const product = new ProductModel(body);
    await product.save();
    const responseArray = [];
    const responseData = {};
    responseData.data = product;
    responseArray.push(responseData);
    res.status(201);
    return res.json(responseArray);
  } catch (error) {
    res.status(500);
    return res.json(error);
  }
};

const getProduct = async (req, res) => {
  const { params } = req;
  try {
    const product = await ProductModel.findById(params.id);
    if (isEmpty(product)) {
      res.status(400);
      return res.json("Bad Request");
    }
    res.status(200);
    return res.json({
      data: product
    });
  } catch (error) {
    res.status(500);
    return res.json(error);
  }
};

const editProduct = async (req, res) => {
  const { params, body } = req;
  if (body.tags) {
    body.tags = createTagArray(body.tags);
  }
  const validationErrors = validateProduct(body);
  if (validationErrors.length > 0) {
    res.status(400);
    return res.json({
      errors: validationErrors
    });
  }
  try {
    const product = await ProductModel.findByIdAndUpdate(params.id, body, {
      new: true
    });
    res.status(200);
    return res.json({
      data: product
    });
  } catch (error) {
    res.status(500);
    return res.json(error);
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
      res.status(200);
      return res.json({
        data
      });
    } else {
      res.status(400);
      return res.json("Bad Request");
    }
  } catch (error) {
    res.status(500);
    return res.json(error);
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200);
    return res.json({
      data: products
    });
  } catch (error) {
    res.status(500);
    return res.json(error);
  }
};

module.exports = {
  test,
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
  getAllProducts
};
