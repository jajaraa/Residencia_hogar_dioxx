const API_URL = 'http://localhost:3001/api';

export const api = {
  // Pacientes
  getPatients: async () => {
    const response = await fetch(`${API_URL}/patients`);
    return response.json();
  },

  addPatient: async (patient) => {
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    return response.json();
  },

  updatePatient: async (id, patient) => {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    return response.json();
  },

  deletePatient: async (id) => {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Personal
  getStaff: async () => {
    const response = await fetch(`${API_URL}/staff`);
    return response.json();
  },

  addStaff: async (staff) => {
    const response = await fetch(`${API_URL}/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staff),
    });
    return response.json();
  },

  deleteStaff: async (id) => {
    const response = await fetch(`${API_URL}/staff/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};