import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { jwtDecode } from "jwt-decode";
const Login = ({ iniciarEnLogin, alEntrar }) => {
  
  const API_URL = "http://34.228.45.59:8080";

  const [esLogin, setEsLogin] = useState(iniciarEnLogin);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navegar = useNavigate();
  
  // Estados del formulario
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  
  // NUEVO: Estado para el nombre de usuario (requerido por la API para registro)
  const [nombre, setNombre] = useState(''); 

  // Sincronización cuando cambia la ruta
  useEffect(() => {
    setEsLogin(iniciarEnLogin);
    setMostrarContrasena(false);
    // Limpiar errores o estados al cambiar de modo si fuera necesario
  }, [iniciarEnLogin]);

  // Convertimos la función en ASYNC para poder esperar a la API
  const manejarAutenticacion = async () => {
    // --- VALIDACIONES LOCALES ---
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexContrasena.test(contrasena)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.");
      return;
    }

    if (!esLogin && contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // --- CONEXIÓN CON LA API ---
    try {
      if (esLogin) {
        // 1. LOGICA DE LOGIN (POST /auth/login) [cite: 110]
        const respuesta = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: correo, 
            password: contrasena 
          }) // [cite: 112]
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
          const decoded = jwtDecode( datos.token);
      
          console.log("Contenido del token:", decoded);

        // Guardamos ambos en localStorage
        localStorage.setItem('token',  datos.token);
        localStorage.setItem('jwtUsuario', JSON.stringify({'uuid':decoded.sub,
                                                          'username':decoded.username,
                                                           'email':decoded.upn})); // Ahora ya tienes el UUID para la página de perfil
          
          if (alEntrar) alEntrar(); // Actualizar estado de la App
          navegar('/'); // Redirigir al Home
        } else {
          alert("Error al entrar: " + (datos.message || "Credenciales incorrectas"));
        }

      } else {
        // 2. LOGICA DE REGISTRO (POST /auth/register) [cite: 95]
        // Nota: La API pide username, email y password. [cite: 99, 100, 101]
        // El teléfono NO se envía aquí, se actualiza después en el perfil.
        const respuesta = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: nombre, // Mapeamos tu input "Nombre" al campo "username"
            email: correo,
            password: contrasena
          })
        });

        if (respuesta.ok) {
          alert("Cuenta creada con éxito. Ahora por favor inicia sesión.");
          setEsLogin(true); // Cambiamos a la vista de login automáticamente
        } else {
          // Intentamos leer el error de la API
          const errorData = await respuesta.json();
          alert("Error al registrar: " + (errorData.message || "Revisa los datos"));
        }
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    }
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
          
          {/* NUEVO: Vinculamos el input de Nombre al estado */}
          {!esLogin && (
            <input 
              type="text" 
              placeholder="Nombre de Usuario" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          )}
          
          {/* Nota: El input de teléfono es solo visual por ahora, 
              ya que el registro de la API no acepta teléfono en este paso [cite: 96] */}
          {!esLogin && <input type="tel" placeholder="Teléfono (se guardará luego)" pattern="[0-9]{9}" />}

          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
          />

          <input 
            type={mostrarContrasena ? "text" : "password"} 
            placeholder="Contraseña" 
            value={contrasena} 
            onChange={(e) => setContrasena(e.target.value)}
          />

          {!esLogin && (
            <input 
              type={mostrarContrasena ? "text" : "password"} 
              placeholder="Confirmar Contraseña" 
              value={confirmarContrasena} 
              onChange={(e) => setConfirmarContrasena(e.target.value)} 
            />
          )}

          <div className="checkbox-container">
            <input 
              type="checkbox" 
              id="verPass" 
              checked={mostrarContrasena} 
              onChange={() => setMostrarContrasena(!mostrarContrasena)} 
            />
            <label htmlFor="verPass">Mostrar contraseña</label>
          </div>

          <button className="btn-main" onClick={manejarAutenticacion}>
            {esLogin ? "Entrar" : "Registrar"}
          </button>

          <p>
            {esLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            <span onClick={() => setEsLogin(!esLogin)} style={{cursor: 'pointer', color: 'blue', marginLeft: '5px'}}>
              {esLogin ? " Regístrate" : " Inicia sesión"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}; 

export default Login;