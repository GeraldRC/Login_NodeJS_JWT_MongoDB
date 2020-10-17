const router = require("express").Router();
const User = require("../models/User");

const Joi = require("@hapi/joi");
const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).email().required(),
  password: Joi.string().min(6).max(1024).required(),
});

router.post("/register", async (req, res) => {
  //validaciones del usuario
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json(
      {error: error.details[0].message}
    );
  }

  const existeElEmail = await User.findOne({email: req.body.email});
  if (existeElEmail) {
      return res.status(400).json({error: true, mensaje: 'El email ya fue registrado'})
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const userDB = await user.save();
    res.json({
      error: null,
      data: userDB,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
