const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');

// Public routes - Anyone can view doctors
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);

// Protected routes - Only authenticated users can create, update, or delete
router.post('/', authMiddleware, createDoctor);
router.put('/:id', authMiddleware, updateDoctor);
router.delete('/:id', authMiddleware, deleteDoctor);

module.exports = router;
