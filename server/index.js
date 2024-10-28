const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data.json');

// Asegurarse de que el archivo data.json existe
async function initializeDataFile() {
  try {
    await fs.access(dataPath);
  } catch {
    const initialData = {
      patients: [],
      staff: []
    };
    await fs.writeFile(dataPath, JSON.stringify(initialData, null, 2));
  }
}

// Leer datos
async function readData() {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
}

// Escribir datos
async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

// Obtener todos los pacientes
app.get('/api/patients', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.patients);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los pacientes' });
  }
});

// Obtener todo el personal
app.get('/api/staff', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.staff);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el personal' });
  }
});

// Agregar nuevo paciente
app.post('/api/patients', async (req, res) => {
  try {
    const data = await readData();
    const newPatient = { ...req.body, id: Date.now() };
    data.patients.push(newPatient);
    await writeData(data);
    res.json(newPatient);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el paciente' });
  }
});

// Agregar nuevo personal
app.post('/api/staff', async (req, res) => {
  try {
    const data = await readData();
    const newStaffMember = { ...req.body, id: Date.now() };
    data.staff.push(newStaffMember);
    await writeData(data);
    res.json(newStaffMember);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el personal' });
  }
});

// Actualizar paciente
app.put('/api/patients/:id', async (req, res) => {
  try {
    const data = await readData();
    const patientId = parseInt(req.params.id);
    data.patients = data.patients.map(patient => 
      patient.id === patientId ? { ...req.body, id: patientId } : patient
    );
    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
});

// Eliminar paciente
app.delete('/api/patients/:id', async (req, res) => {
  try {
    const data = await readData();
    const patientId = parseInt(req.params.id);
    data.patients = data.patients.filter(patient => patient.id !== patientId);
    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
});

// Eliminar personal
app.delete('/api/staff/:id', async (req, res) => {
  try {
    const data = await readData();
    const staffId = parseInt(req.params.id);
    data.staff = data.staff.filter(staff => staff.id !== staffId);
    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el personal' });
  }
});

initializeDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});


