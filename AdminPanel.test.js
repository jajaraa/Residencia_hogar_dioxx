import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPanel from './AdminPanel';

describe('AdminPanel', () => {
  // Pruebas de renderizado inicial
  test('renderiza la navegación correctamente', () => {
    render(<AdminPanel />);
    
    // Verificar todos los botones de navegación
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Nueva Ficha')).toBeInTheDocument();
    expect(screen.getByText('Ver Pacientes')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Control E/S')).toBeInTheDocument();
  });

  test('renderiza la vista de bienvenida por defecto', () => {
    render(<AdminPanel />);
    
    expect(screen.getByText('Bienvenidos al Sistema de Administración')).toBeInTheDocument();
    expect(screen.getByText('Hogar de Ancianos')).toBeInTheDocument();
  });

  // Pruebas de navegación
  test('cambia a la vista de nueva ficha al hacer click', () => {
    render(<AdminPanel />);
    
    fireEvent.click(screen.getByText('Nueva Ficha'));
    expect(screen.getByText('Crear Nueva Ficha de Paciente')).toBeInTheDocument();
  });

  test('cambia a la vista de pacientes al hacer click', () => {
    render(<AdminPanel />);
    
    fireEvent.click(screen.getByText('Ver Pacientes'));
    expect(screen.getByText('Lista de Pacientes')).toBeInTheDocument();
  });

  test('cambia a la vista de personal al hacer click', () => {
    render(<AdminPanel />);
    
    fireEvent.click(screen.getByText('Personal'));
    expect(screen.getByText('Gestión de Personal')).toBeInTheDocument();
  });

  // Pruebas de formulario de nuevo paciente
  test('muestra errores de validación en formulario de nuevo paciente', async () => {
    render(<AdminPanel />);
    
    // Ir a la vista de nuevo paciente
    fireEvent.click(screen.getByText('Nueva Ficha'));
    
    // Intentar enviar el formulario vacío
    fireEvent.click(screen.getByText('Guardar Paciente'));
    
    // Verificar mensajes de error
    expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
    expect(screen.getByText('El apellido es requerido')).toBeInTheDocument();
    expect(screen.getByText('La fecha de nacimiento es requerida')).toBeInTheDocument();
    expect(screen.getByText('El RUT es requerido')).toBeInTheDocument();
  });

  test('permite crear un nuevo paciente con datos válidos', async () => {
    render(<AdminPanel />);
    
    // Ir a la vista de nuevo paciente
    fireEvent.click(screen.getByText('Nueva Ficha'));
    
    // Llenar el formulario
    await userEvent.type(screen.getByLabelText(/nombre/i), 'Juan');
    await userEvent.type(screen.getByLabelText(/apellido/i), 'Pérez');
    await userEvent.type(screen.getByLabelText(/rut/i), '12.345.678-9');
    await userEvent.type(screen.getByLabelText(/teléfono de emergencia/i), '+56912345678');
    await userEvent.type(screen.getByLabelText(/contacto de emergencia/i), 'María Pérez');
    
    // Seleccionar género
    const selectGenero = screen.getByLabelText(/género/i);
    userEvent.selectOptions(selectGenero, 'masculino');
    
    // Enviar formulario
    fireEvent.click(screen.getByText('Guardar Paciente'));
    
    // Verificar mensaje de éxito
    expect(screen.getByText('Paciente registrado exitosamente')).toBeInTheDocument();
  });

  // Pruebas de validación de RUT
  test('valida formato de RUT correctamente', async () => {
    render(<AdminPanel />);
    
    fireEvent.click(screen.getByText('Nueva Ficha'));
    
    const rutInput = screen.getByLabelText(/rut/i);
    await userEvent.type(rutInput, '11.111.111-1');
    
    fireEvent.click(screen.getByText('Guardar Paciente'));
    
    expect(screen.getByText('El RUT ingresado no es válido')).toBeInTheDocument();
  });

  // Pruebas de lista de pacientes
  test('muestra mensaje cuando no hay pacientes', () => {
    render(<AdminPanel />);
    
    fireEvent.click(screen.getByText('Ver Pacientes'));
    
    expect(screen.getByText('No hay pacientes registrados')).toBeInTheDocument();
  });
});