
import './App.css';
import Home from './home/Home';
import {Link, Route, Routes} from 'react-router-dom';
import Productos from './productos/Productos';
import TrabajaConNosotros from './trabaja_con_nosotros/TrabajaConNosotros';
import Suscripcion from './suscripcion/Suscripcion';
import Sesion from './sesion/Sesion';
import logo from './assets/Logo-Synapse.png';
function App() {
  return (
   <div className="App">
    <header>

       <nav>
                 <Link to="/"><img src={logo} className='logo-cabecera'></img></Link>
                <Link to="/" className='btn-menu'>Home</Link>
                <Link to="/productos" className='btn-menu'>Productos</Link>
                <Link to="/trabaja-con-nosotros" className='btn-menu'>Trabaja Con Nosotros</Link>
                <Link to="/suscripcion" className='btn-menu'>Suscripcion</Link>
                <Link to="/sesion" className='btn-menu'>Inicio de sesion</Link>
        </nav>
    </header>
     
      <main>
              <Routes>
                {/* CAMBIO CLAVE: Usamos el componente Home, NO el componente App */}
                <Route path="/" element={<Home />} /> 
                <Route path="/productos" element={<Productos />} />
                <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
                <Route path="/suscripcion" element={<Suscripcion />} />
                <Route path="/sesion" element={<Sesion />} />
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
                    <Link to="/sesion" className='btn-menu'>Inicio de sesion</Link>
            </nav>
          </div>
          <div>

            <Link to="/"><img src={logo} className='logo-footer'></img></Link>
            <p>lorem ipsum sadasdafdsgfsd af sdfsdf sdf asdasf df lorem ipsum sadasdafdsgfsd af sdfsdf sdf asdasf df</p>
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
    </div>
  );
}

export default App;
