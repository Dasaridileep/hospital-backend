const prisma = require('../prismaClient');

const createPatient = async (req, res) => {
  const { name, age, gender, address } = req.body;
  const createdById = req.user.userId;

  try {
    const patient = await prisma.patient.create({
      data: { name, age, gender, address, createdById },
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create patient.' });
  }
};

// 2. Get all patients for the logged-in user
const getAllPatients = async (req, res) => {
  const userId = req.user.userId;

  try {
    const patients = await prisma.patient.findMany({
      where: { createdById: userId },
    });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve patients.' });
  }
};

// 3. Get a single patient by ID
const getPatientById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const patient = await prisma.patient.findFirst({
      where: { id, createdById: userId }, 
    });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve patient.' });
  }
};

// 4. Update a patient
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const { name, age, gender, address } = req.body;

  try {

    const existingPatient = await prisma.patient.findFirst({
      where: { id, createdById: userId },
    });

    if (!existingPatient) {
      return res.status(404).json({ error: 'Patient not found or you are not authorized to update it.' });
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: { name, age, gender, address },
    });
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update patient.' });
  }
};


// 5. Delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {

    const existingPatient = await prisma.patient.findFirst({
      where: { id, createdById: userId },
    });

    if (!existingPatient) {
      return res.status(404).json({ error: 'Patient not found or you are not authorized to delete it.' });
    }
    
    await prisma.patient.delete({
      where: { id },
    });
    res.status(204).send(); 
  } catch (error) {
     res.status(500).json({ error: 'Failed to delete patient.' });
  }
};


module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};