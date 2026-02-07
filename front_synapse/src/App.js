import React, { useState } from 'react';
import './App.css';
import Home from './home/Home';
import {Link, Route, Routes} from 'react-router-dom';
import Productos from './productos/Productos';
import TrabajaConNosotros from './trabaja_con_nosotros/TrabajaConNosotros';
import Suscripcion from './suscripcion/Suscripcion';
import Sesion from './sesion/Sesion';
import logo from './assets/LogoSynapse.svg';
import ChatBot from './chatBot/ChatBot';
import Login from './login_registro/Login';
import logoPerfil from './assets/perfil.png';
function App() {
  const[estaAutenticado,setEstaAutenticado]=useState(false);
  return (
   <div className="App">
    <header>

       <nav>
                <Link to="/"><img src={logo} className='logo-cabecera'></img></Link>
                <Link to="/" className='btn-menu'>Home</Link>
                <Link to="/productos" className='btn-menu'>Productos</Link>
                <Link to="/trabaja-con-nosotros" className='btn-menu'>Trabaja Con Nosotros</Link>
                <Link to="/suscripcion" className='btn-menu'>Suscripcion</Link>
{!estaAutenticado ? (
            // Si NO está autenticado, muestra los botones de acceso
            <div className="auth-buttons">
              <button className='btn'>
                <Link to="/sesion" className='btn-menu'>Iniciar sesion</Link>
              </button>
              <button className='btn'>
                <Link to="/login" className='btn-menu'>Registrarse</Link>
              </button>
            </div>
          ) : (

            <div className="iconoUsuario">
              <span title="Perfil" style={{ marginRight: '10px', cursor: 'pointer' }}>
                 <Link to="/perfil"><img src={logoPerfil} />Mi perfil </Link>
              </span> 
              <button className="btn-salir" onClick={() => setEstaAutenticado(false)}>
                Salir
              </button>
            </div>
          )}
        </nav>
      </header>
     
      <main>
              <Routes>
                
                <Route path="/" element={<Home />} /> 
                <Route path="/productos" element={<Productos />} />
                <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
                <Route path="/suscripcion" element={<Suscripcion />} />
                <Route path="/sesion" element={<Login iniciarEnLogin={true} alEntrar={() => setEstaAutenticado(true)} />} />
                <Route path="/login" element={<Login iniciarEnLogin={false} alEntrar={() => setEstaAutenticado(true)} />} />
                <Route path="/perfil" element={<Sesion />} />
              </Routes>
            </main>

      <footer>
        <div className='footer-top'>

          <div className='nav-footer'>

            <h3>Menu</h3>
            <nav> 
                    <Link to="/" className='btn-menu'>Home</Link>
                    <Link to="/productos" className='btn-menu'>Productos</Link>
                    <Link to="/trabaja-con-nosotros" className='btn-menu'>Trabaja Con Nosotros</Link>
                    <Link to="/suscripcion" className='btn-menu'>Suscripcion</Link>
            </nav>
          </div>
          <div>

            <Link to="/"><img src={logo} className='logo-footer'></img></Link>
            <p>Pagina oficial de Synapse, la mejor opción para la gestión de hogar.</p>
          </div>

          <div>
            <h3>Contacto</h3>
            <ul>
              <li>
                +34 693 584 264
              </li>
              <li>
                synapsetech@gmail.com
              </li>
              <li>
                @synapsetechno
              </li>
            </ul>
          </div>
        </div>
        <div className='footer-bottom'>
          <ul>
            <li>© 2026 Synapse</li>
            <li>
              <a>Aviso Legal</a>
            </li>
            <li>
              <a>Política de Cookies</a>
            </li>
            <li>
              <a>Política de privacidad</a>
            </li>
          </ul>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}

export default App;
