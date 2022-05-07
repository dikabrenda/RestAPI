var express = require("express");
var router = express.Router();
// var bcrypt = require("bcrypt");
const Validator = require("fastest-validator");

const { users } = require("../models");
const v = new Validator();

router.post('/', async (req, res) => {
  const schema = {
    username: 'string',
    email: 'string',
    password: 'string',
    re_password: 'string'
  }

  const validate = v.validate(req.body, schema);

  if(validate.length){
    return res.status(422).json({
      status: 0,
      message: "Failed register users",
      data: validate
    });
  }
  // const salt = await bcrypt.genSalt()
  // const hasPassword = await bcrypt.hash(salt, password)

  let Users = await users.create(req.body)
  res.status(201).json({
    status: 1,
    message: "Success register user",
    data: Users
  })
});

module.exports = router;