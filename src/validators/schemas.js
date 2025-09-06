const Joi = require('joi');


const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const patientSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().integer().min(0).required(),
  gender: Joi.string().required(),
  address: Joi.string().required(),
});

const doctorSchema = Joi.object({
  name: Joi.string().min(3).required(),
  specialization: Joi.string().required(),
});

const mappingSchema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  patientSchema,
  doctorSchema,
  mappingSchema,
};
