import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renderiza el título principal', () => {
    render(<App />);
    const titleElement = screen.getByText('Panel de Administración');
    expect(titleElement).toBeInTheDocument();
  });

  test('renderiza los botones de navegación', () => {
    render(<App />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Nueva Ficha')).toBeInTheDocument();
    expect(screen.getByText('Ver Pacientes')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Control E/S')).toBeInTheDocument();
  });

  test('renderiza el mensaje de bienvenida', () => {
    render(<App />);
    expect(screen.getByText('Bienvenidos al Sistema de Administración')).toBeInTheDocument();
    expect(screen.getByText('Hogar de Ancianos')).toBeInTheDocument();
  });
});