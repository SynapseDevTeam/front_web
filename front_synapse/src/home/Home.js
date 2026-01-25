import './home.css';
import Carrusel from '../carrusel/Carrusel';
import logoPrueba from '../assets/Logo-Synapse.png'
{/**AQUI ES COMO SI FUERA EL INDEX HTML DE INICIO*/}
const Home = () => {
    const slidersBanner=[
      <div className='banner-principal'>
        <div className='banner-article'>
          <h2>El Hogar del Futuro. Hoy.</h2>
          <p>Synapse es el sistema operativo inteligente que transforma la gestión de tu vivienda, creando un futuro donde la eficiencia y la proactividad son la nueva normalidad.</p>
          <button className='btn btn-info'>Descubre la Inteligencia de tu Hogar</button>
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
          <button className='btn btn-delete'>Conoce nuestro Marketplace</button>
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
        <p>lorem ipsum lorep lsadkasfkla fkdsnflsdf  fdklsjfnsj dlfnsd fklamdkfksd m klakmnl sf nalk akln anf</p>
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
          <p>FREEMIUM</p>
          <p>Gratis</p>
        </div>

        <div>
          <p>FREEMIUM</p>
          <p>Gratis</p>
        </div>
      </div>
      <button className='btn btn-descarga'>Ver Más</button>
    </div>

    <div className='informacion'>
      <div className='lateral-grid'>
        <div>
          uso de ia
        </div>
        <div>
          uso de ia
        </div>
        <div>
          uso de ia
        </div>
        <div>
          uso de ia
        </div>
      </div>

      <div className='portada-info'>
        <img src={logoPrueba} className='logo-cabecera'></img>
        <button>Ver Más</button>
      </div>

      <div className='lateral-grid'>
        <div>
          uso de ia
        </div>
        <div>
          uso de ia
        </div>
        <div>
          uso de ia
        </div>
        <div>
          uso de ia
        </div>
      </div>
    </div>

    <div className='trabaja-con-nosotros'>
      <h3>Trabaja con nosotros</h3>
      <p>¿quieres trabajar con nosotros? contactanos por el correo electronico synapsetech@gmail.com o por el formulario</p>
      <button>Ver Más</button>
    </div>
    <div className='colaboradores'>
      <h3>Colaboradores</h3>
      <Carrusel slidesPerView={4} colab={true} delay={1500}/>
    </div>
    </>

  );
};

export default Home;