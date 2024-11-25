import React, { useState, useEffect } from 'react';
import { Home, Users, FilePlus, UserPlus, LogIn, Trash2, Edit, ChevronRight } from 'lucide-react';

// Componente de Alerta personalizado
const Alert = ({ children, type }) => {
  const types = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700"
  };

  return (
    <div className={`${types[type]} border px-4 py-3 rounded relative mb-4`}>
      {children}
    </div>
  );
};

// Componente de Bienvenida
const WelcomeView = () => (
  <div className="text-center p-8 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-sky-700 mb-4">Bienvenidos al Sistema de Administración</h1>
    <h2 className="text-xl text-sky-600 mb-6">Hogar de Ancianos</h2>
    <p className="text-gray-600">
      Seleccione una opción del menú para comenzar a gestionar los pacientes y sus medicamentos.
    </p>
  </div>
);

const AdminPanel = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [patients, setPatients] = useState(() => {
    // Cargar pacientes del localStorage al iniciar
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : [];
  });
  
  const [staff, setStaff] = useState(() => {
    // Cargar personal del localStorage al iniciar
    const savedStaff = localStorage.getItem('staff');
    return savedStaff ? JSON.parse(savedStaff) : [];
  });
  
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Guardar pacientes en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  // Guardar personal en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('staff', JSON.stringify(staff));
  }, [staff]);

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    if (!formData.rut.trim()) newErrors.rut = "El RUT es requerido";
    if (!formData.telefonoEmergencia.trim()) newErrors.telefonoEmergencia = "El teléfono de emergencia es requerido";
    if (!formData.contactoEmergencia.trim()) newErrors.contactoEmergencia = "El contacto de emergencia es requerido";
    if (!formData.genero) newErrors.genero = "El género es requerido";
    return newErrors;
  };

  



  // Componente de Nuevo Paciente
  const NewPatientForm = () => {
    const [formData, setFormData] = useState({
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      rut: '',
      telefonoEmergencia: '',
      contactoEmergencia: '',
      genero: ''
    });
  
    // Función para validar RUT chileno
    const validarRut = (rut) => {
      // Limpiar el RUT de puntos y guión
      const rutLimpio = rut.replace(/[.-]/g, '');
      
      // Obtener dígito verificador
      const dv = rutLimpio.charAt(rutLimpio.length - 1).toUpperCase();
      
      // Obtener cuerpo del RUT
      const rutNumerico = parseInt(rutLimpio.slice(0, -1), 10);
      
      // Si no es un número válido, retornar false
      if (isNaN(rutNumerico)) return false;
      
      // Calcular dígito verificador
      const calcularDv = (rutNumerico) => {
        let suma = 0;
        let multiplicador = 2;
        let rutReverso = rutNumerico.toString().split('').reverse();
        
        for (let digit of rutReverso) {
          suma += parseInt(digit) * multiplicador;
          multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        
        const resultado = 11 - (suma % 11);
        if (resultado === 11) return '0';
        if (resultado === 10) return 'K';
        return resultado.toString();
      };
      
      // Comparar dígito verificador calculado con el proporcionado
      return calcularDv(rutNumerico) === dv;
    };
  
    // Función para formatear RUT
    const formatearRut = (rut) => {
      // Limpiar el RUT de cualquier formato previo
      const rutLimpio = rut.replace(/[.-]/g, '');
      
      if (rutLimpio.length < 2) return rutLimpio;
      
      // Separar cuerpo y dígito verificador
      const cuerpo = rutLimpio.slice(0, -1);
      const dv = rutLimpio.slice(-1);
      
      // Formatear cuerpo con puntos
      let rutFormateado = '';
      for (let i = cuerpo.length - 1, j = 0; i >= 0; i--, j++) {
        rutFormateado = cuerpo.charAt(i) + rutFormateado;
        if ((j + 1) % 3 === 0 && i !== 0) {
          rutFormateado = '.' + rutFormateado;
        }
      }
      
      return `${rutFormateado}-${dv}`;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validateForm(formData);
      
      if (Object.keys(newErrors).length === 0) {
        setPatients([...patients, { ...formData, id: Date.now(), medicamentos: [] }]);
        setFormData({
          nombre: '',
          apellido: '',
          fechaNacimiento: '',
          rut: '',
          telefonoEmergencia: '',
          contactoEmergencia: '',
          genero: ''
        });
        setShowSuccess(true);
        setErrors({});
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setErrors(newErrors);
      }
    };
  
    const validateForm = (formData) => {
      const newErrors = {};
      if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
      if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
      if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
      if (!formData.rut.trim()) {
        newErrors.rut = "El RUT es requerido";
      } else if (!validarRut(formData.rut)) {
        newErrors.rut = "El RUT ingresado no es válido";
      }
      if (!formData.telefonoEmergencia.trim()) newErrors.telefonoEmergencia = "El teléfono de emergencia es requerido";
      if (!formData.contactoEmergencia.trim()) newErrors.contactoEmergencia = "El contacto de emergencia es requerido";
      if (!formData.genero) newErrors.genero = "El género es requerido";
      return newErrors;
    };
  
    // Manejador específico para el campo RUT
    const handleRutChange = (e) => {
      let rut = e.target.value;
      // Permitir solo números, K/k, puntos y guión
      rut = rut.replace(/[^0-9kK.-]/g, '');
      
      // Formatear el RUT mientras se escribe
      if (rut.length > 0) {
        rut = formatearRut(rut);
      }
      
      setFormData({...formData, rut: rut});
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-sky-700 mb-6">Crear Nueva Ficha de Paciente</h2>
        
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            Paciente registrado exitosamente
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                className={`w-full p-2 border rounded focus:border-sky-500 ${errors.nombre ? 'border-red-500' : ''}`}
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Apellido</label>
              <input
                type="text"
                className={`w-full p-2 border rounded focus:border-sky-500 ${errors.apellido ? 'border-red-500' : ''}`}
                value={formData.apellido}
                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
              />
              {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">RUT</label>
              <input
                type="text"
                className={`w-full p-2 border rounded focus:border-sky-500 ${errors.rut ? 'border-red-500' : ''}`}
                value={formData.rut}
                onChange={handleRutChange}
                placeholder="12.345.678-9"
                maxLength="12"
              />
              {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Fecha de Nacimiento</label>
              <input
                type="date"
                className={`w-full p-2 border rounded focus:border-sky-500 ${errors.fechaNacimiento ? 'border-red-500' : ''}`}
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
              />
              {errors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Teléfono de Emergencia</label>
              <input
                type="tel"
                className={`w-full p-2 border rounded focus:border-sky-500 ${errors.telefonoEmergencia ? 'border-red-500' : ''}`}
                value={formData.telefonoEmergencia}
                onChange={(e) => setFormData({...formData, telefonoEmergencia: e.target.value})}
              />
              {errors.telefonoEmergencia && <p className="text-red-500 text-sm mt-1">{errors.telefonoEmergencia}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Contacto de Emergencia</label>
              <input
                type="text"
                className={`w-full p-2 border rounded focus:border-sky-500 ${errors.contactoEmergencia ? 'border-red-500' : ''}`}
                value={formData.contactoEmergencia}
                onChange={(e) => setFormData({...formData, contactoEmergencia: e.target.value})}
              />
              {errors.contactoEmergencia && <p className="text-red-500 text-sm mt-1">{errors.contactoEmergencia}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Género</label>
              <select
                className={`w-full p-2 border rounded focus:border-sky-500 ${errors.genero ? 'border-red-500' : ''}`}
                value={formData.genero}
                onChange={(e) => setFormData({...formData, genero: e.target.value})}
              >
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
              {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero}</p>}
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700 transition-colors"
          >
            Guardar Paciente
          </button>
        </form>
      </div>
    );
  };

  // Componente para gestionar el personal
  const StaffManagementView = () => {
    const [newStaff, setNewStaff] = useState({
      nombre: '',
      apellido: '',
      rut: '',
      correo: '',
      telefono: '',
      rol: ''
    });
    const [errors, setErrors] = useState({});
    const [editingStaff, setEditingStaff] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Función para validar RUT (reutilizamos la que ya teníamos)
    const validarRut = (rut) => {
      // Limpiar el RUT de puntos y guión
      const rutLimpio = rut.replace(/[.-]/g, '');
      
      // Obtener dígito verificador
      const dv = rutLimpio.charAt(rutLimpio.length - 1).toUpperCase();
      
      // Obtener cuerpo del RUT
      const rutNumerico = parseInt(rutLimpio.slice(0, -1), 10);
      
      // Si no es un número válido, retornar false
      if (isNaN(rutNumerico)) return false;
      
      // Calcular dígito verificador
      const calcularDv = (rutNumerico) => {
        let suma = 0;
        let multiplicador = 2;
        let rutReverso = rutNumerico.toString().split('').reverse();
        
        for (let digit of rutReverso) {
          suma += parseInt(digit) * multiplicador;
          multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        
        const resultado = 11 - (suma % 11);
        if (resultado === 11) return '0';
        if (resultado === 10) return 'K';
        return resultado.toString();
      };
      
      // Comparar dígito verificador calculado con el proporcionado
      return calcularDv(rutNumerico) === dv;
    };
  
    // Función para formatear RUT
    const formatearRut = (rut) => {
      // Limpiar el RUT de cualquier formato previo
      const rutLimpio = rut.replace(/[.-]/g, '');
      
      if (rutLimpio.length < 2) return rutLimpio;
      
      // Separar cuerpo y dígito verificador
      const cuerpo = rutLimpio.slice(0, -1);
      const dv = rutLimpio.slice(-1);
      
      // Formatear cuerpo con puntos
      let rutFormateado = '';
      for (let i = cuerpo.length - 1, j = 0; i >= 0; i--, j++) {
        rutFormateado = cuerpo.charAt(i) + rutFormateado;
        if ((j + 1) % 3 === 0 && i !== 0) {
          rutFormateado = '.' + rutFormateado;
        }
      }
      
      return `${rutFormateado}-${dv}`; // Agregar este return
    };

    // Función para validar teléfono
    const validarTelefono = (telefono) => {
      const telefonoRegex = /^\+569\d{8}$/;
      return telefonoRegex.test(telefono);
    };

    // Función para validar correo
    const validarCorreo = (correo) => {
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return correoRegex.test(correo);
    };

    const validateForm = (data) => {
      const newErrors = {};
      if (!data.nombre.trim()) newErrors.nombre = "El nombre es requerido";
      if (!data.apellido.trim()) newErrors.apellido = "El apellido es requerido";
      if (!data.rut.trim()) {
        newErrors.rut = "El RUT es requerido";
      } else if (!validarRut(data.rut)) {
        newErrors.rut = "El RUT ingresado no es válido";
      }
      if (!data.correo.trim()) {
        newErrors.correo = "El correo es requerido";
      } else if (!validarCorreo(data.correo)) {
        newErrors.correo = "El correo no es válido";
      }
      if (!data.telefono.trim()) {
        newErrors.telefono = "El teléfono es requerido";
      } else if (!validarTelefono(data.telefono)) {
        newErrors.telefono = "El teléfono debe tener formato +569XXXXXXXX";
      }
      if (!data.rol) newErrors.rol = "El rol es requerido";
      
      return newErrors;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validateForm(newStaff);

      if (Object.keys(newErrors).length === 0) {
        if (editingStaff) {
          // Actualizar personal existente
          setStaff(staff.map(s => s.id === editingStaff.id ? {...newStaff, id: s.id} : s));
          setEditingStaff(null);
        } else {
          // Agregar nuevo personal
          setStaff([...staff, { ...newStaff, id: Date.now() }]);
        }
        setNewStaff({
          nombre: '',
          apellido: '',
          rut: '',
          correo: '',
          telefono: '',
          rol: ''
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setErrors(newErrors);
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-sky-700">Gestión de Personal</h2>
        
        {/* Formulario de personal */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {editingStaff ? 'Editar Personal' : 'Agregar Nuevo Personal'}
          </h3>
          
          {showSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              Personal {editingStaff ? 'actualizado' : 'agregado'} exitosamente
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.nombre ? 'border-red-500' : ''}`}
                  value={newStaff.nombre}
                  onChange={(e) => setNewStaff({...newStaff, nombre: e.target.value})}
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Apellido</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.apellido ? 'border-red-500' : ''}`}
                  value={newStaff.apellido}
                  onChange={(e) => setNewStaff({...newStaff, apellido: e.target.value})}
                />
                {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">RUT</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.rut ? 'border-red-500' : ''}`}
                  value={newStaff.rut}
                  onChange={(e) => {
                    let rut = e.target.value;
                    rut = rut.replace(/[^0-9kK.-]/g, '');
                    if (rut.length > 0) {
                      rut = formatearRut(rut);
                    }
                    setNewStaff({...newStaff, rut: rut});
                  }}
                  placeholder="12.345.678-9"
                  maxLength="12"
                />
                {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Correo</label>
                <input
                  type="email"
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.correo ? 'border-red-500' : ''}`}
                  value={newStaff.correo}
                  onChange={(e) => setNewStaff({...newStaff, correo: e.target.value})}
                />
                {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Teléfono</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.telefono ? 'border-red-500' : ''}`}
                  value={newStaff.telefono}
                  onChange={(e) => setNewStaff({...newStaff, telefono: e.target.value})}
                  placeholder="+569XXXXXXXX"
                />
                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Rol</label>
                <select
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.rol ? 'border-red-500' : ''}`}
                  value={newStaff.rol}
                  onChange={(e) => setNewStaff({...newStaff, rol: e.target.value})}
                >
                  <option value="">Seleccione rol...</option>
                  <option value="medico">Médico</option>
                  <option value="enfermero">Enfermero</option>
                  <option value="auxiliar">Auxiliar</option>
                </select>
                {errors.rol && <p className="text-red-500 text-sm mt-1">{errors.rol}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              {editingStaff && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingStaff(null);
                    setNewStaff({
                      nombre: '',
                      apellido: '',
                      rut: '',
                      correo: '',
                      telefono: '',
                      rol: ''
                    });
                    setErrors({});
                  }}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700 transition-colors"
              >
                {editingStaff ? 'Actualizar' : 'Agregar'} Personal
              </button>
            </div>
          </form>
        </div>

        {/* Lista de personal */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Personal Registrado</h3>
          <div className="space-y-4">
            {staff.length === 0 ? (
              <p className="text-center text-gray-500">No hay personal registrado</p>
            ) : (
              staff.map(person => (
                <div key={person.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-lg">
                      {person.nombre} {person.apellido}
                    </h4>
                    <p className="text-gray-600">
                      {person.rol.charAt(0).toUpperCase() + person.rol.slice(1)} - RUT: {person.rut}
                    </p>
                    <p className="text-gray-600">
                      Correo: {person.correo} - Tel: {person.telefono}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingStaff(person);
                        setNewStaff(person);
                        window.scrollTo(0, 0);
                      }}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Está seguro de eliminar este personal?')) {
                          setStaff(staff.filter(s => s.id !== person.id));
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // Componente de Control de Entradas y Salidas
  const EntryExitControlView = () => {
    const [registroActual, setRegistroActual] = useState({
      tipo: 'salida',
      fecha: '',
      hora: '',
      acompanante: '',
      telefono: '',
      pacienteId: '',
      dispositivoSeguimiento: {
        tipo: '', // 'telefono' o 'airtag'
        numero: '', // Para teléfono
        nombreAirtag: '', // Para AirTag
        identificador: '' // Número de serie o identificador del AirTag
      }
    });
    
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

   // Validar teléfono chileno
   const validarTelefono = (telefono) => {
    const telefonoRegex = /^\+569\d{8}$/;
    return telefonoRegex.test(telefono);
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.pacienteId) newErrors.pacienteId = "Debe seleccionar un paciente";
    if (!data.fecha) newErrors.fecha = "La fecha es requerida";
    if (!data.hora) newErrors.hora = "La hora es requerida";
    if (data.tipo === 'salida') {
      if (!data.acompanante) newErrors.acompanante = "El nombre del acompañante es requerido";
      if (!data.telefono) {
        newErrors.telefono = "El teléfono es requerido";
      } else if (!validarTelefono(data.telefono)) {
        newErrors.telefono = "El teléfono debe tener formato +569XXXXXXXX";
      }

            // Validación de dispositivo de seguimiento
      if (!data.dispositivoSeguimiento.tipo) {
        newErrors.dispositivoTipo = "Debe seleccionar un tipo de dispositivo de seguimiento";
      } else {
        if (data.dispositivoSeguimiento.tipo === 'telefono' && !data.dispositivoSeguimiento.numero) {
          newErrors.dispositivoNumero = "Debe ingresar el número de teléfono del dispositivo";
        } else if (data.dispositivoSeguimiento.tipo === 'airtag') {
          if (!data.dispositivoSeguimiento.nombreAirtag) {
            newErrors.dispositivoNombre = "Debe ingresar un nombre para el AirTag";
          }
          if (!data.dispositivoSeguimiento.identificador) {
            newErrors.dispositivoIdentificador = "Debe ingresar el identificador del AirTag";
          }
        }
      }
    }
    return newErrors;
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(registroActual);

    if (Object.keys(newErrors).length === 0) {
      const paciente = patients.find(p => p.id === registroActual.pacienteId);
      
      if (!paciente) {
        alert('Paciente no encontrado');
        return;
      }

      const updatedPatient = {
        ...paciente,
        registrosEntradaSalida: [
          ...(paciente.registrosEntradaSalida || []),
          { ...registroActual, id: Date.now() }
        ]
      };

      setPatients(patients.map(p => p.id === paciente.id ? updatedPatient : p));
      setRegistroActual({
        tipo: 'salida',
        fecha: '',
        hora: '',
        acompanante: '',
        telefono: '',
        pacienteId: '',
        dispositivoSeguimiento: {
          tipo: '',
          numero: '',
          nombreAirtag: '',
          identificador: ''
        }
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-sky-700">Control de Entradas y Salidas</h2>

      {patients.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No hay pacientes registrados en el sistema. Por favor, registre pacientes primero.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Campos existentes */}
              <div>
                <label className="block text-gray-700 mb-2">Paciente</label>
                <select
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.pacienteId ? 'border-red-500' : ''}`}
                  value={registroActual.pacienteId}
                  onChange={(e) => setRegistroActual({...registroActual, pacienteId: parseInt(e.target.value)})}
                >
                  <option value="">Seleccione paciente...</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.nombre} {patient.apellido} - {patient.rut}
                    </option>
                  ))}
                </select>
                {errors.pacienteId && <p className="text-red-500 text-sm mt-1">{errors.pacienteId}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Tipo de Registro</label>
                <select
                  className="w-full p-2 border rounded focus:border-sky-500"
                  value={registroActual.tipo}
                  onChange={(e) => setRegistroActual({...registroActual, tipo: e.target.value})}
                >
                  <option value="salida">Salida</option>
                  <option value="entrada">Entrada</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.fecha ? 'border-red-500' : ''}`}
                  value={registroActual.fecha}
                  onChange={(e) => setRegistroActual({...registroActual, fecha: e.target.value})}
                />
                {errors.fecha && <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Hora</label>
                <input
                  type="time"
                  className={`w-full p-2 border rounded focus:border-sky-500 ${errors.hora ? 'border-red-500' : ''}`}
                  value={registroActual.hora}
                  onChange={(e) => setRegistroActual({...registroActual, hora: e.target.value})}
                />
                {errors.hora && <p className="text-red-500 text-sm mt-1">{errors.hora}</p>}
              </div>

              {registroActual.tipo === 'salida' && (
  <>
    <div>
      <label className="block text-gray-700 mb-2">Nombre del Acompañante</label>
      <input
        type="text"
        className={`w-full p-2 border rounded focus:border-sky-500 ${errors.acompanante ? 'border-red-500' : ''}`}
        value={registroActual.acompanante}
        onChange={(e) => setRegistroActual({...registroActual, acompanante: e.target.value})}
        placeholder="Nombre completo del acompañante"
      />
      {errors.acompanante && <p className="text-red-500 text-sm mt-1">{errors.acompanante}</p>}
    </div>

    <div>
      <label className="block text-gray-700 mb-2">Teléfono del Acompañante</label>
      <input
        type="text"
        className={`w-full p-2 border rounded focus:border-sky-500 ${errors.telefono ? 'border-red-500' : ''}`}
        value={registroActual.telefono}
        onChange={(e) => setRegistroActual({...registroActual, telefono: e.target.value})}
        placeholder="+569XXXXXXXX"
      />
      {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
    </div>

    {/* Campos de dispositivo de seguimiento */}
    <div>
      <label className="block text-gray-700 mb-2">Tipo de Dispositivo de Seguimiento</label>
      <select
        className={`w-full p-2 border rounded focus:border-sky-500 ${errors.dispositivoTipo ? 'border-red-500' : ''}`}
        value={registroActual.dispositivoSeguimiento.tipo}
        onChange={(e) => setRegistroActual({
          ...registroActual,
          dispositivoSeguimiento: {
            ...registroActual.dispositivoSeguimiento,
            tipo: e.target.value,
            numero: '',
            nombreAirtag: '',
            identificador: ''
          }
        })}
      >
        <option value="">Seleccione tipo...</option>
        <option value="telefono">Teléfono Móvil</option>
        <option value="airtag">AirTag</option>
      </select>
      {errors.dispositivoTipo && <p className="text-red-500 text-sm mt-1">{errors.dispositivoTipo}</p>}
    </div>

                  {registroActual.dispositivoSeguimiento.tipo === 'telefono' && (
                    <div>
                      <label className="block text-gray-700 mb-2">Número de Teléfono del Dispositivo</label>
                      <input
                        type="text"
                        className={`w-full p-2 border rounded focus:border-sky-500 ${errors.dispositivoNumero ? 'border-red-500' : ''}`}
                        placeholder="+569XXXXXXXX"
                        value={registroActual.dispositivoSeguimiento.numero}
                        onChange={(e) => setRegistroActual({
                          ...registroActual,
                          dispositivoSeguimiento: {
                            ...registroActual.dispositivoSeguimiento,
                            numero: e.target.value
                          }
                        })}
                      />
                      {errors.dispositivoNumero && <p className="text-red-500 text-sm mt-1">{errors.dispositivoNumero}</p>}
                    </div>
                  )}

                  {registroActual.dispositivoSeguimiento.tipo === 'airtag' && (
                    <>
                      <div>
                        <label className="block text-gray-700 mb-2">Nombre del AirTag</label>
                        <input
                          type="text"
                          className={`w-full p-2 border rounded focus:border-sky-500 ${errors.dispositivoNombre ? 'border-red-500' : ''}`}
                          placeholder="Ej: AirTag Personal"
                          value={registroActual.dispositivoSeguimiento.nombreAirtag}
                          onChange={(e) => setRegistroActual({
                            ...registroActual,
                            dispositivoSeguimiento: {
                              ...registroActual.dispositivoSeguimiento,
                              nombreAirtag: e.target.value
                            }
                          })}
                        />
                        {errors.dispositivoNombre && <p className="text-red-500 text-sm mt-1">{errors.dispositivoNombre}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Identificador del AirTag</label>
                        <input
                          type="text"
                          className={`w-full p-2 border rounded focus:border-sky-500 ${errors.dispositivoIdentificador ? 'border-red-500' : ''}`}
                          placeholder="Ej: AT98X4Z..."
                          value={registroActual.dispositivoSeguimiento.identificador}
                          onChange={(e) => setRegistroActual({
                            ...registroActual,
                            dispositivoSeguimiento: {
                              ...registroActual.dispositivoSeguimiento,
                              identificador: e.target.value
                            }
                          })}
                        />
                        {errors.dispositivoIdentificador && <p className="text-red-500 text-sm mt-1">{errors.dispositivoIdentificador}</p>}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {showSuccess && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
    Registro guardado exitosamente
  </div>
)}

<button
  type="submit"
  className="w-full bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700 transition-colors"
>
  Registrar {registroActual.tipo === 'salida' ? 'Salida' : 'Entrada'}
</button>

          </form>

          {/* Historial de registros actualizado para mostrar información del dispositivo */}
          {registroActual.pacienteId && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Historial de Registros</h3>
              {patients.find(p => p.id === registroActual.pacienteId)?.registrosEntradaSalida?.length > 0 ? (
                <div className="space-y-2">
                  {patients
                    .find(p => p.id === registroActual.pacienteId)
                    .registrosEntradaSalida
                    .sort((a, b) => new Date(b.fecha + ' ' + b.hora) - new Date(a.fecha + ' ' + a.hora))
                    .map(registro => (
                      <div
                        key={registro.id}
                        className={`p-4 rounded-lg ${
                          registro.tipo === 'salida' ? 'bg-red-50' : 'bg-green-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium">
                              {registro.tipo === 'salida' ? 'Salida' : 'Entrada'}
                            </span>
                            <p className="text-sm text-gray-600">
                              Fecha: {registro.fecha} - Hora: {registro.hora}
                            </p>
                            {registro.tipo === 'salida' && (
                              <>
                                <p className="text-sm text-gray-600">
                                  Acompañante: {registro.acompanante} - Tel: {registro.telefono}
                                </p>
                                {registro.dispositivoSeguimiento?.tipo && (
                                  <p className="text-sm text-gray-600">
                                    Dispositivo de Seguimiento: {' '}
                                    {registro.dispositivoSeguimiento.tipo === 'telefono' ? (
                                      <>Teléfono Móvil: {registro.dispositivoSeguimiento.numero}</>
                                    ) : (
                                      <>AirTag: {registro.dispositivoSeguimiento.nombreAirtag} (ID: {registro.dispositivoSeguimiento.identificador})</>
                                    )}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No hay registros para este paciente</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

  
  // Vista de Lista de Pacientes
  const PatientListView = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-sky-700">Lista de Pacientes</h2>
        {patients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay pacientes registrados
          </div>
        ) : (
          <div className="grid gap-4">
            {patients.map(patient => (
              <div key={patient.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-lg">
                    {patient.nombre} {patient.apellido}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPatient(patient);
                      setCurrentView('patientDetail');
                    }}
                    className="p-2 text-sky-600 hover:bg-sky-50 rounded-full"
                    title="Ver detalles"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPatient(patient);
                      setEditMode(true);
                      setCurrentView('newPatient');
                    }}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                    title="Editar"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Está seguro de eliminar este paciente?')) {
                        setPatients(patients.filter(p => p.id !== patient.id));
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Eliminar"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

// Vista Detallada del Paciente
const PatientDetailView = () => {
  const [newMed, setNewMed] = useState({ nombre: '', dosis: '', frecuencia: '' });
  const [newAlergia, setNewAlergia] = useState({ nombre: '', reaccion: '', severidad: 'leve' });
  const [newEnfermedad, setNewEnfermedad] = useState({ nombre: '', diagnosticada: '', tratamiento: '' });
  const [newPatologia, setNewPatologia] = useState({ nombre: '', detalles: '', fecha: '' });
  
  if (!selectedPatient) return null;

  // Medicamentos handlers
  const addMedicamento = () => {
    if (!newMed.nombre || !newMed.dosis || !newMed.frecuencia) {
      alert('Por favor complete todos los campos del medicamento');
      return;
    }

    const updatedPatient = {
      ...selectedPatient,
      medicamentos: [...(selectedPatient.medicamentos || []), { ...newMed, id: Date.now() }]
    };
    setSelectedPatient(updatedPatient);
    setPatients(patients.map(p => p.id === selectedPatient.id ? updatedPatient : p));
    setNewMed({ nombre: '', dosis: '', frecuencia: '' });
  };

  // Alergias handlers
  const addAlergia = () => {
    if (!newAlergia.nombre || !newAlergia.reaccion) {
      alert('Por favor complete los campos requeridos de la alergia');
      return;
    }

    const updatedPatient = {
      ...selectedPatient,
      alergias: [...(selectedPatient.alergias || []), { ...newAlergia, id: Date.now() }]
    };
    setSelectedPatient(updatedPatient);
    setPatients(patients.map(p => p.id === selectedPatient.id ? updatedPatient : p));
    setNewAlergia({ nombre: '', reaccion: '', severidad: 'leve' });
  };

  // Enfermedades handlers
  const addEnfermedad = () => {
    if (!newEnfermedad.nombre || !newEnfermedad.diagnosticada) {
      alert('Por favor complete los campos requeridos de la enfermedad');
      return;
    }

    const updatedPatient = {
      ...selectedPatient,
      enfermedades: [...(selectedPatient.enfermedades || []), { ...newEnfermedad, id: Date.now() }]
    };
    setSelectedPatient(updatedPatient);
    setPatients(patients.map(p => p.id === selectedPatient.id ? updatedPatient : p));
    setNewEnfermedad({ nombre: '', diagnosticada: '', tratamiento: '' });
  };

  // Patologías handlers
  const addPatologia = () => {
    if (!newPatologia.nombre || !newPatologia.fecha) {
      alert('Por favor complete los campos requeridos de la patología');
      return;
    }

    const updatedPatient = {
      ...selectedPatient,
      patologias: [...(selectedPatient.patologias || []), { ...newPatologia, id: Date.now() }]
    };
    setSelectedPatient(updatedPatient);
    setPatients(patients.map(p => p.id === selectedPatient.id ? updatedPatient : p));
    setNewPatologia({ nombre: '', detalles: '', fecha: '' });
  };

  // Delete handlers
  const removeItem = (itemType, itemId) => {
    if (window.confirm(`¿Está seguro de eliminar este elemento?`)) {
      const updatedPatient = {
        ...selectedPatient,
        [itemType]: selectedPatient[itemType].filter(item => item.id !== itemId)
      };
      setSelectedPatient(updatedPatient);
      setPatients(patients.map(p => p.id === selectedPatient.id ? updatedPatient : p));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
      {/* Encabezado y datos personales... */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-sky-700">
          Ficha de Paciente: {selectedPatient.nombre} {selectedPatient.apellido}
        </h2>
        <button
          onClick={() => setCurrentView('patientList')}
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
        >
          Volver a la lista
        </button>
      </div>

      {/* Información Personal */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Información Personal</h3>
          <div className="space-y-2">
            <p><span className="font-medium">RUT:</span> {selectedPatient.rut}</p>
            <p><span className="font-medium">Fecha de Nacimiento:</span> {selectedPatient.fechaNacimiento}</p>
            <p><span className="font-medium">Género:</span> {selectedPatient.genero}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Contacto de Emergencia</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Nombre:</span> {selectedPatient.contactoEmergencia}</p>
            <p><span className="font-medium">Teléfono:</span> {selectedPatient.telefonoEmergencia}</p>
          </div>
        </div>
      </div>

      {/* Sección de Alergias */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Alergias</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <input
            placeholder="Nombre de la alergia"
            className="p-2 border rounded"
            value={newAlergia.nombre}
            onChange={(e) => setNewAlergia({...newAlergia, nombre: e.target.value})}
          />
          <input
            placeholder="Reacción"
            className="p-2 border rounded"
            value={newAlergia.reaccion}
            onChange={(e) => setNewAlergia({...newAlergia, reaccion: e.target.value})}
          />
          <select
            className="p-2 border rounded"
            value={newAlergia.severidad}
            onChange={(e) => setNewAlergia({...newAlergia, severidad: e.target.value})}
          >
            <option value="leve">Leve</option>
            <option value="moderada">Moderada</option>
            <option value="grave">Grave</option>
          </select>
          <button
            onClick={addAlergia}
            className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700"
          >
            Agregar Alergia
          </button>
        </div>

        <div className="space-y-2">
          {(!selectedPatient.alergias || selectedPatient.alergias.length === 0) ? (
            <p className="text-center py-4 text-gray-500">No hay alergias registradas</p>
          ) : (
            selectedPatient.alergias.map(alergia => (
              <div key={alergia.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-medium">{alergia.nombre}</span> - 
                  <span> Reacción: {alergia.reaccion}</span> - 
                  <span className={`ml-2 ${
                    alergia.severidad === 'grave' ? 'text-red-600' : 
                    alergia.severidad === 'moderada' ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    Severidad: {alergia.severidad}
                  </span>
                </div>
                <button
                  onClick={() => removeItem('alergias', alergia.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sección de Enfermedades */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Enfermedades</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <input
            placeholder="Nombre de la enfermedad"
            className="p-2 border rounded"
            value={newEnfermedad.nombre}
            onChange={(e) => setNewEnfermedad({...newEnfermedad, nombre: e.target.value})}
          />
          <input
            type="date"
            placeholder="Fecha diagnóstico"
            className="p-2 border rounded"
            value={newEnfermedad.diagnosticada}
            onChange={(e) => setNewEnfermedad({...newEnfermedad, diagnosticada: e.target.value})}
          />
          <input
            placeholder="Tratamiento"
            className="p-2 border rounded"
            value={newEnfermedad.tratamiento}
            onChange={(e) => setNewEnfermedad({...newEnfermedad, tratamiento: e.target.value})}
          />
          <button
            onClick={addEnfermedad}
            className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700"
          >
            Agregar Enfermedad
          </button>
        </div>

        <div className="space-y-2">
          {(!selectedPatient.enfermedades || selectedPatient.enfermedades.length === 0) ? (
            <p className="text-center py-4 text-gray-500">No hay enfermedades registradas</p>
          ) : (
            selectedPatient.enfermedades.map(enfermedad => (
              <div key={enfermedad.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-medium">{enfermedad.nombre}</span> - 
                  <span> Diagnosticada: {enfermedad.diagnosticada}</span>
                  {enfermedad.tratamiento && (
                    <span> - Tratamiento: {enfermedad.tratamiento}</span>
                  )}
                </div>
                <button
                  onClick={() => removeItem('enfermedades', enfermedad.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sección de Otras Patologías */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Otras Patologías</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <input
            placeholder="Nombre de la patología"
            className="p-2 border rounded"
            value={newPatologia.nombre}
            onChange={(e) => setNewPatologia({...newPatologia, nombre: e.target.value})}
          />
          <input
            placeholder="Detalles"
            className="p-2 border rounded"
            value={newPatologia.detalles}
            onChange={(e) => setNewPatologia({...newPatologia, detalles: e.target.value})}
          />
          <input
            type="date"
            placeholder="Fecha"
            className="p-2 border rounded"
            value={newPatologia.fecha}
            onChange={(e) => setNewPatologia({...newPatologia, fecha: e.target.value})}
          />
          <button
            onClick={addPatologia}
            className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700"
          >
            Agregar Patología
          </button>
        </div>

        <div className="space-y-2">
          {(!selectedPatient.patologias || selectedPatient.patologias.length === 0) ? (
            <p className="text-center py-4 text-gray-500">No hay patologías registradas</p>
          ) : (
            selectedPatient.patologias.map(patologia => (
              <div key={patologia.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-medium">{patologia.nombre}</span>
                  {patologia.detalles && (
                    <span> - Detalles: {patologia.detalles}</span>
                  )}
                  <span> - Fecha: {patologia.fecha}</span>
                </div>
                <button
                  onClick={() => removeItem('patologias', patologia.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Medicamentos</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <input
            placeholder="Nombre del medicamento"
            className="p-2 border rounded"
            value={newMed.nombre}
            onChange={(e) => setNewMed({...newMed, nombre: e.target.value})}
          />
          <input
            placeholder="Dosis (ej: 500mg)"
            className="p-2 border rounded"
            value={newMed.dosis}
            onChange={(e) => setNewMed({...newMed, dosis: e.target.value})}
          />
          <select
            className="p-2 border rounded"
            value={newMed.frecuencia}
            onChange={(e) => setNewMed({...newMed, frecuencia: e.target.value})}
          >
            <option value="">Seleccione frecuencia...</option>
            <option value="6 horas">Cada 6 horas</option>
            <option value="8 horas">Cada 8 horas</option>
            <option value="12 horas">Cada 12 horas</option>
            <option value="24 horas">Cada 24 horas</option>
            <option value="Según necesidad">Según necesidad</option>
            <option value="Otro">Otro</option>
          </select>
          <button
            onClick={addMedicamento}
            className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700"
          >
            Agregar Medicamento
          </button>
        </div>

        {newMed.frecuencia === "Otro" && (
          <div className="mb-4">
            <input
              placeholder="Especifique la frecuencia"
              className="p-2 border rounded w-full"
              onChange={(e) => setNewMed({...newMed, frecuencia: e.target.value})}
            />
          </div>
        )}

        <div className="space-y-2">
          {(!selectedPatient.medicamentos || selectedPatient.medicamentos.length === 0) ? (
            <p className="text-center py-4 text-gray-500">No hay medicamentos registrados</p>
          ) : (
            <div className="grid gap-2">
              {selectedPatient.medicamentos.map(med => (
                <div key={med.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-medium text-lg text-sky-700">{med.nombre}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-gray-600">
                          <span className="font-medium">Dosis:</span> {med.dosis}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Frecuencia:</span> {med.frecuencia}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setNewMed(med);
                          // Aquí puedes agregar lógica para editar
                        }}
                        className="text-yellow-600 hover:text-yellow-700 p-1"
                        title="Editar"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => removeItem('medicamentos', med.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Eliminar"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabla resumen de medicamentos */}
      {selectedPatient.medicamentos && selectedPatient.medicamentos.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Horario de Medicamentos</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-sky-50">
                  <th className="px-4 py-2 border">Hora</th>
                  <th className="px-4 py-2 border">Medicamentos</th>
                </tr>
              </thead>
              <tbody>
                {["06:00", "08:00", "12:00", "14:00", "18:00", "20:00", "22:00"].map(hora => {
                  const medicamentosHora = selectedPatient.medicamentos.filter(med => {
                    // Lógica para determinar si el medicamento corresponde a esta hora
                    const frecuencia = parseInt(med.frecuencia);
                    const horaNum = parseInt(hora);
                    // Esta es una lógica simplificada, puedes ajustarla según tus necesidades
                    return true; // Por ahora mostramos todos los medicamentos en cada hora
                  });

                  return (
                    <tr key={hora}>
                      <td className="px-4 py-2 border">{hora}</td>
                      <td className="px-4 py-2 border">
                        {medicamentosHora.map(med => (
                          <div key={med.id} className="mb-1">
                            {med.nombre} - {med.dosis}
                          </div>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
    return (
    <div className="min-h-screen bg-sky-50">
      <nav className="bg-sky-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setCurrentView('welcome');
                setSelectedPatient(null);
                setEditMode(false);
              }}
              className={`flex items-center space-x-2 p-2 rounded ${currentView === 'welcome' ? 'bg-sky-700' : 'hover:bg-sky-700'}`}
            >
              <Home size={20} />
              <span>Inicio</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('newPatient');
                setSelectedPatient(null);
                setEditMode(false);
              }}
              className={`flex items-center space-x-2 p-2 rounded ${currentView === 'newPatient' ? 'bg-sky-700' : 'hover:bg-sky-700'}`}
            >
              <FilePlus size={20} />
              <span>Nueva Ficha</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('patientList');
                setSelectedPatient(null);
                setEditMode(false);
              }}
              className={`flex items-center space-x-2 p-2 rounded ${currentView === 'patientList' ? 'bg-sky-700' : 'hover:bg-sky-700'}`}
            >
              <Users size={20} />
              <span>Ver Pacientes</span>
            </button>
            
            <button
              onClick={() => {
                setCurrentView('staff');
                setSelectedPatient(null);
                setEditMode(false);
              }}
              className={`flex items-center space-x-2 p-2 rounded ${currentView === 'staff' ? 'bg-sky-700' : 'hover:bg-sky-700'}`}
            >
              <UserPlus size={20} />
              <span>Personal</span>
            </button>
            <button
    onClick={() => {
      setCurrentView('entryExit');
      setSelectedPatient(null);
      setEditMode(false);
    }}
    className={`flex items-center space-x-2 p-2 rounded ${currentView === 'entryExit' ? 'bg-sky-700' : 'hover:bg-sky-700'}`}
  >
    <LogIn size={20} />
    <span>Control E/S</span>
  </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
  {currentView === 'welcome' && <WelcomeView />}
  {currentView === 'newPatient' && <NewPatientForm />}
  {currentView === 'patientList' && <PatientListView />}
  {currentView === 'patientDetail' && <PatientDetailView />}
  {currentView === 'staff' && <StaffManagementView />}
  {currentView === 'entryExit' && <EntryExitControlView />}
</main>
    </div>
  );
};
  
  export default AdminPanel;