import React, { useState } from 'react';
import './Login.css';

const Login = (paginaLogin) => {
  const [isLogin, setIsLogin] = useState(paginaLogin);

  return (
    <div className="container">
      {/* Lado Izquierdo Fijo */}
      <div className="left-side">
        <h1>Inicio de Sesión</h1>
        <p>Bienvenido de nuevo a nuestra plataforma.</p>
      </div>

      {/* Lado Derecho Dinámico */}
      <div className="right-side">
        {isLogin ? (
          <div className="form-container">
            <h2>Ingresar</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <button className="btn-main">Entrar</button>
            <p>
              ¿No tienes cuenta? 
              <span onClick={() => setIsLogin(false)}> Regístrate</span>
            </p>
          </div>
        ) : (
          <div className="form-container">
            <h2>Crear Cuenta</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <input type="password" placeholder="Repita la contraseña" />
            <button className="btn-main">Registrar</button>
            <p>
              ¿Ya tienes cuenta? 
              <span onClick={() => setIsLogin(true)}> Inicia sesión</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;