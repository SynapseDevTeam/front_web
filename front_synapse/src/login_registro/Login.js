import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// 1. Asegúrate de recibir alEntrar aquí
const Login = ({ iniciarEnLogin, alEntrar }) => {
  const [esLogin, setEsLogin] = useState(iniciarEnLogin);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navegar = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  // Sincronización cuando cambia la ruta entre login y registro
  useEffect(() => {
    setEsLogin(iniciarEnLogin);
    setMostrarContrasena(false);
  }, [iniciarEnLogin]);

  const manejarAutenticacion = () => {
    // Validar Correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    // Validar Complejidad (8 caracteres, Mayús, Minús, Número)
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexContrasena.test(contrasena)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.");
      return;
    }

    // Validar coincidencia en registro
    if (!esLogin && contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Si todo está bien
    if (alEntrar) {
      alEntrar();
    }
    navegar('/');
  }; 

  return (
    <div className="container">
      <div className="left-side">
        <h1>{esLogin ? "Inicio de Sesión" : "Crear Cuenta"}</h1>
        <p>Bienvenido de nuevo a nuestra plataforma.</p>
      </div>

      <div className="right-side">
        <div className="form-container">
          <h2>{esLogin ? "Ingresar" : "Nueva Cuenta"}</h2>
          
          {!esLogin && <input type="text" placeholder="Nombre Completo" />}
          {!esLogin && <input type="tel" placeholder="Teléfono" pattern="[0-9]{9}" />}

          <input 
            type="email" placeholder="Correo electrónico" value={correo}onChange={(e) => setCorreo(e.target.value)} />

          <input 
            type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" value={contrasena}onChange={(e) => setContrasena(e.target.value)}/>

          {!esLogin && (
            <input type={mostrarContrasena ? "text" : "password"} placeholder="Confirmar Contraseña" value={confirmarContrasena}onChange={(e) => setConfirmarContrasena(e.target.value)} />
          )}

          <div className="checkbox-container">
            <input type="checkbox" id="verPass" checked={mostrarContrasena} onChange={() => setMostrarContrasena(!mostrarContrasena)} />
            <label htmlFor="verPass">Mostrar contraseña</label>
          </div>

          <button className="btn-main" onClick={manejarAutenticacion}>
            {esLogin ? "Entrar" : "Registrar"}
          </button>

          <p>
            {esLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            <span onClick={() => setEsLogin(!esLogin)}>
              {esLogin ? " Regístrate" : " Inicia sesión"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}; 
export default Login;