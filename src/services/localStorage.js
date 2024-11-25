const STORAGE_KEYS = {
    PATIENTS: 'hogar_patients',
    STAFF: 'hogar_staff',
    ENTRY_EXIT: 'hogar_entry_exit'
  };
  
  export const loadInitialData = () => {
    try {
      const patients = JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS)) || [];
      const staff = JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF)) || [];
      
      return {
        patients,
        staff
      };
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return {
        patients: [],
        staff: []
      };
    }
  };
  
  export const savePatients = (patients) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    } catch (error) {
      console.error('Error saving patients:', error);
    }
  };
  
  export const saveStaff = (staff) => {
    try {
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };
  
  // Función auxiliar para validar los datos antes de guardarlos
  export const validateData = (data, type) => {
    if (!Array.isArray(data)) {
      console.error(`Invalid ${type} data: expected array`);
      return false;
    }
    
    // Validaciones específicas según el tipo de datos
    switch (type) {
      case 'patients':
        return data.every(patient => 
          patient.id && 
          patient.nombre && 
          patient.apellido && 
          patient.rut
        );
      
      case 'staff':
        return data.every(member => 
          member.id && 
          member.nombre && 
          member.apellido && 
          member.rut && 
          member.rol
        );
        
      default:
        return true;
    }
  };
  
  // Función para exportar todos los datos a un archivo JSON
  export const exportData = () => {
    try {
      const allData = {
        patients: JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS)) || [],
        staff: JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF)) || [],
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      
      const dataStr = JSON.stringify(allData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `hogar_data_backup_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      linkElement.remove();
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  };
  
  // Función para importar datos desde un archivo JSON
  export const importData = async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validar la estructura del archivo
      if (!data.patients || !data.staff || !data.version) {
        throw new Error('Invalid data format');
      }
      
      // Validar los datos antes de guardarlos
      if (!validateData(data.patients, 'patients') || !validateData(data.staff, 'staff')) {
        throw new Error('Invalid data content');
      }
      
      // Guardar los datos
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(data.patients));
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(data.staff));
      
      return {
        patients: data.patients,
        staff: data.staff
      };
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Failed to import data');
    }
  };