const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');
const validate = require('../middleware/validationMiddleware');
const { patientSchema } = require('../validators/schemas');

router.use(authMiddleware);
router.post('/', validate(patientSchema), createPatient);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.put('/:id', validate(patientSchema), updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
