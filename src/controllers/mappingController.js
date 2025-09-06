const prisma = require('../prismaClient');

// Create a new patient-doctor mapping
const createMapping = async (req, res, next) => {
  const { patientId, doctorId } = req.body;
  const userId = req.user.userId;

  try {
    // Security Check: Ensure the patient belongs to the authenticated user
    const patient = await prisma.patient.findFirst({
      where: { id: patientId, createdById: userId },
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found or you are not authorized.' });
    }

    const mapping = await prisma.patientDoctorMapping.create({
      data: { patientId, doctorId },
    });
    res.status(201).json(mapping);
  } catch (error) {
    next(error);
  }
};

// Get all mappings for the authenticated user
const getAllMappings = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const mappings = await prisma.patientDoctorMapping.findMany({
      where: {
        // Only find mappings where the patient was created by the logged-in user
        patient: {
          createdById: userId,
        },
      },
      include: {
        // Include the full patient and doctor details in the response
        patient: true,
        doctor: true,
      },
    });
    res.status(200).json(mappings);
  } catch (error) {
    next(error);
  }
};

// Get all doctors assigned to a specific patient
const getDoctorsForPatient = async (req, res, next) => {
  const { patientId } = req.params;
  const userId = req.user.userId;

  try {
    // Security Check: First, verify this patient belongs to the user
    const patient = await prisma.patient.findFirst({
      where: { id: patientId, createdById: userId },
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found or you are not authorized.' });
    }

    // Now, find all mappings for that patient
    const mappings = await prisma.patientDoctorMapping.findMany({
      where: { patientId: patientId },
      include: { doctor: true }, // Include the doctor's details
    });

    // Extract just the doctor information from the mappings
    const doctors = mappings.map(mapping => mapping.doctor);
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

// Delete a mapping by its ID
const deleteMapping = async (req, res, next) => {
  const { id } = req.params; // This is the ID of the mapping itself
  const userId = req.user.userId;

  try {
    // Security Check: Ensure the mapping to be deleted belongs to a patient owned by the user
    const mapping = await prisma.patientDoctorMapping.findFirst({
      where: {
        id: id,
        patient: { createdById: userId },
      },
    });

    if (!mapping) {
      return res.status(404).json({ error: 'Mapping not found or you are not authorized.' });
    }

    await prisma.patientDoctorMapping.delete({
      where: { id: id },
    });

    res.status(204).send(); // 204 No Content is standard for a successful delete
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createMapping,
  getAllMappings,
  getDoctorsForPatient,
  deleteMapping,
};

