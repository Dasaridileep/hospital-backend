const prisma = require('../prismaClient');
const createDoctor = async (req, res) => {
  const { name, specialization } = req.body;

  try {
    const doctor = await prisma.doctor.create({
      data: { name, specialization },
    });
    res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create doctor.' });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve doctors.' });
  }
};
const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: id },
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found.' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve doctor.' });
  }
};
const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialization } = req.body;

  try {
    const doctor = await prisma.doctor.update({
      where: { id: id },
      data: { name, specialization },
    });
    res.status(200).json(doctor);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Doctor not found.' });
    }
    console.log(error);
    res.status(500).json({ error: 'Failed to update doctor.' });
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.patientDoctorMapping.deleteMany({
      where: { doctorId: id }
    });
    
    await prisma.doctor.delete({
      where: { id: id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Doctor not found.' });
    }
    console.log(error);
    res.status(500).json({ error: 'Failed to delete doctor.' });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
