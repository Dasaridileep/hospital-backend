const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createMapping,
  getAllMappings,
  getDoctorsForPatient,
  deleteMapping,
} = require('../controllers/mappingController');

// Apply the auth middleware to ALL routes in this file
router.use(authMiddleware);

router.post('/', createMapping);                     // POST /api/mappings/
router.get('/', getAllMappings);                    // GET /api/mappings/
router.get('/:patient_id', getDoctorsForPatient);   // GET /api/mappings/<patient_id>/
router.delete('/:id', deleteMapping);               // DELETE /api/mappings/<id>/

module.exports = router;
