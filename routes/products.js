var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Product } = require("../models");
const v = new Validator();

router.get("/", async (req, res) => {
  const product = await Product.findAll();
  return res.json({
      status: 1,
      message : "Success GET data",
      data: product
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  return res.json(
    product || {
      status: 0,
      message: "Data not found",
      data: [],
    }
  );
});

router.post("/", async (req, res) => {
  const schema = {
    name: "string",
    brand: "string",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  let product = await Product.create(req.body);
  res.status(201).json({
      status: 1,
      message: "Success create data",
      data: product
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let product = await Product.findByPk(id);

  if (!product) {
    return res.status(422).json({
      status: 0,
      message: "Product not Found",
      data: [],
    });
  }

  const schema = {
    name: "string|optional",
    brand: "string|optional",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  product = await product.update(req.body);
  res.status(200).json(product);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let product = await Product.findByPk(id);

  if (!product) {
    return res.status(422).json({
      status: 0,
      message: "Product not Found",
      data: [],
    });
  }

  await product.destroy();
  res.json({
    status: 1,
    message: "Product is deleted",
  });
});

module.exports = router;
