const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    // If validation fails, send a 400 Bad Request response with the error message
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation succeeds, proceed to the controller
  next();
};

module.exports = validate;
