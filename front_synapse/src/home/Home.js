import './home.css';
import Carrusel from '../carrusel/Carrusel';
import logoPrueba from '../assets/Logo-Synapse.png';
import { Link } from 'react-router-dom';


const Home = () => {
    {/* En esta constante recogemos todos los sliders que queremos que tenga nuestro carrusel, en este caso en el inicio. */}
    const slidersBanner=[
      <div className='banner-principal'>
        <div className='banner-article'>
          <h2>El Hogar del Futuro. Hoy.</h2>
          <p>Synapse es el sistema operativo inteligente que transforma la gestión de tu vivienda, creando un futuro donde la eficiencia y la proactividad son la nueva normalidad.</p>
          <button className='btn btn-info'><Link to="/productos">Descubre la Inteligencia de tu Hogar</Link></button>
        </div>
      </div>,
      <div className='banner-promociones'>
        <div className='banner-article'>
          <h2>Anticípate a los problemas antes de que ocurran.</h2>
          <p>Creamos un "gemelo digital" de tu vivienda para monitorizar el estado de tus electrodomésticos y avisarte antes de cualquier fallo potencial.</p>
          <button className='btn btn-edit'>Ver cómo funciona</button>
        </div>
      </div>,
      <div className='banner-informacion'>
        <div className='banner-article'>
          <h2>Más vida para tus aparatos, menos huella para el planeta.</h2>
          <p>Prolongamos la vida útil de tus sistemas y optimizamos el consumo de energía para reducir los residuos electrónicos y las emisiones.</p>
          <button className='btn btn-delete'><Link to="/productos">Conoce nuestro Marketplace</Link></button>
        </div>
      </div>,
      <div className='banner-profesional'>
        <div className='banner-article'>
          <h2>Reparaciones inteligentes, diagnósticos exactos.</h2>
          <p>Enviamos a técnicos cualificados con un diagnóstico previo de la avería, ahorrándote tiempo, dinero y desplazamientos innecesarios.</p>
          <button className='btn btn-delete'>Conoce nuestro Marketplace</button>
        </div>
      </div>
    ]
    return (
    <>
    <Carrusel listaSlides={slidersBanner}/>
    <div className='banner-intro'>
      <div>
        <h1>
          Synapse
        </h1>
        <p>En Synapse, creemos que tu hogar debería cuidarte a ti, y no al revés. Nacimos con la misión de eliminar la incertidumbre y el estrés de las averías domésticas. Combinando inteligencia artificial y tecnología de gemelos digitales, transformamos casas convencionales en hogares predictivos que te avisan antes de que algo falle, ahorrándote tiempo, dinero y preocupaciones.</p>
      </div>
      <img src={logoPrueba} className='logo-cabecera'></img>
    </div>
    <div className='section-suscripcion'>
      <h2>Planes de suscripción</h2>
      <div className='planes'>
        <div>
          <p>FREEMIUM</p>
          <p>Gratis</p>
        </div>

        <div>
          <p>PREMIUM</p>
          <p>7.99€/mes</p>
        </div>

        <div>
          <p>PREMIUM PRO</p>
          <p>12.99€/mes</p>
        </div>
      </div>
      <p>Elige el plan que mejor se adapte a las necesidades de tu hogar y empieza a ahorrar tiempo y dinero con el mantenimiento inteligente de Synapse.</p>
      <button className='btn btn-descarga'><Link to="/suscripcion">Ver Más</Link></button>
    </div>

    <div className='informacion'>
      <div className='lateral-grid'>
        <div>
          <h3>Gemelo Digital (Digital Twin):</h3>
          Crea un modelo virtual de tu hogar escaneando facturas y etiquetas de electrodomésticos.
        </div>
        <div>
          <h3>Motor de IA Predictiva:</h3>
          Cruza tus datos con bases de datos masivas para aprender el comportamiento normal y predecir fallos.
        </div>
        <div>
          <h3>Integración Sensorial:</h3>
          Conexión opcional con sensores y APIs para una precisión máxima en el diagnóstico en tiempo real.
        </div>
        <div>
          <h3>Dashboard de Salud:</h3>
          Visualiza el estado de tu hogar y la vida útil de cada aparato con códigos de color intuitivos.
        </div>
      </div>

      <div className='portada-info'>
        <img src={logoPrueba} className='logo-cabecera'></img>
        <button className='btn btn-descarga'><Link to="/productos">Ver Más</Link></button>
      </div>

      <div className='lateral-grid'>
        <div>
          <h3>Alertas Proactivas:</h3>
          Recibe avisos detallados sobre aumentos de consumo o anomalías antes de que ocurra una avería.
        </div>
        <div>
          <h3>Diagnóstico por AR:</h3>
          Instrucciones visuales sobre la cámara de tu móvil para realizar comprobaciones técnicas tú mismo.
        </div>
        <div>
          <h3>Técnicos Optimizados:</h3>
          Conecta con profesionales que reciben el diagnóstico previo de la IA para ahorrar tiempo y costes.
        </div>
        <div>
          <h3>Bóveda Digital:</h3>
          Centraliza y protege todas tus garantías, manuales, facturas e historiales de reparación en un toque.
        </div>
      </div>
    </div>

    <div className='trabaja-con-nosotros'>
      <h3>Trabaja con nosotros</h3>
      <p>¿quieres trabajar con nosotros? contactanos por el correo electronico <strong>synapsetech@gmail.com</strong> o por el formulario</p>
      <button className='btn btn-edit'><Link to="/trabaja-con-nosotros">Ver Más</Link></button>
    </div>
    <div className='colaboradores'>
      <h3>Colaboradores</h3>
      <Carrusel slidesPerView={6} colab={true} delay={1500}/>
    </div>
    </>

  );
};

export default Home;