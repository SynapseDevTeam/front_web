import logo from "../assets/perfil.png";
import { useState } from "react";
import './sesion.css';
import Popup from "../popUp/PopUp";
import { Link } from "react-router-dom";
function Sesion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [activeIndex, setActiveIndex] = useState(-1);

  const datos = [
  {
    titulo: "¿Qué es exactamente un 'Gemelo Digital' de mi hogar?",
    contenido: "Es una réplica virtual de tu casa. Al subir tus facturas y manuales, Synapse crea un modelo que conoce la edad y el estado de cada aparato, permitiéndonos simular fallos y prevenirlos antes de que ocurran en la vida real."
  },
  {
    titulo: "¿Cómo puede la IA predecir que algo se va a romper?",
    contenido: "Analizamos patrones de uso y datos históricos de miles de dispositivos similares. Si detectamos una anomalía en el consumo energético o un comportamiento fuera de lo común, nuestro algoritmo te avisará de que una avería es inminente."
  },
  {
    titulo: "¿Es necesario instalar sensores en todos mis electrodomésticos?",
    contenido: "No es obligatorio. Synapse es capaz de trabajar solo con la información digital de tus aparatos. Sin embargo, para una precisión del 100%, ofrecemos kits de sensores inteligentes que se instalan en minutos sin necesidad de obras."
  },
  {
    titulo: "¿Qué pasa si la IA detecta un fallo? ¿Tengo que buscar yo al técnico?",
    contenido: "¡Para nada! Synapse te sugerirá técnicos certificados en tu zona y les enviará automáticamente el diagnóstico de la avería. Así, el profesional llegará a tu casa sabiendo exactamente qué pieza necesita cambiar, ahorrándote tiempo y dinero."
  },
  {
    titulo: "¿Mis datos de privacidad están protegidos?",
    contenido: "Tu privacidad es nuestra prioridad absoluta. Toda la información de tu hogar se almacena en una 'Bóveda Digital' con cifrado de grado bancario. Nosotros no vendemos tus datos; solo los usamos para que tu casa sea más eficiente."
  },
  {
    titulo: "¿Cuánto puedo llegar a ahorrar con Synapse?",
    contenido: "De media, nuestros usuarios ahorran un 25% anual en reparaciones de emergencia y hasta un 15% en su factura energética gracias a la optimización de uso que sugiere nuestra IA."
  }
];

  const handleToggle = (index) => {
    // Si haces clic en el que ya está abierto, se cierra. Si no, se abre el nuevo.
    setActiveIndex(activeIndex === index ? -1 : index);
  };
  const [popupActivo, setPopupActivo] = useState(null);
  const cerrarPopup = () => setPopupActivo(null);
  return (
    <>
    <div className='banner-intro'></div>
      <div className="vista-perfil">
        <div className="lateral-grid">
        <p onClick={() => setPopupActivo('pago')}>Método de pago</p>
        <p onClick={() => setPopupActivo('dispositivos')}>Dispositivos asociados</p>
        <p onClick={() => {
          if(window.confirm("Esta seguro de que quiere cerrar sesion en todos sus dispositivos?")){
            console.log("se ha cerrado todo");
          }
        }}>Cerrar sesión en todos</p>
      </div>

        <div className="info-general-acc">
            <img src={logo}></img>

            <p className="plan-select">Plan seleccionado: default</p>

            <p>Nombre apellidos (xx/xx/xxxx)</p>

            <p>Correo: ejemplo@gmail.com</p>

            <p>Telefono: +66 666 666 666</p>

            <div>
              <button className="btn btn-delete">Eliminar cuenta</button><button className="btn btn-edit">Editar</button>
            </div>
        </div>

        <div className="lateral-grid">
        <p onClick={() => setPopupActivo('servicios')}>Servicios y técnicos</p>
        <Link to="/suscripcion"><p>Cambiar suscripción</p></Link>
        <p onClick={() => setPopupActivo('password')}>Cambiar contraseña</p>
      </div>

      {/* Popup de MÉTODOS DE PAGO */}
      <Popup isOpen={popupActivo === 'pago'} onClose={cerrarPopup}>
        <h2>Métodos de Pago (EN DESARROLLO)</h2>
        <p>Aquí aparecerán tus tarjetas guardadas.</p>
        <button className="btn">Añadir tarjeta</button>
      </Popup>

      {/* Popup de DISPOSITIVOS */}
      <Popup isOpen={popupActivo === 'dispositivos'} onClose={cerrarPopup}>
        <h2>Dispositivos Conectados</h2>
        <ul>
          <li>iPhone de Juan</li>
          <li>Samsung TV Salón</li>
        </ul>
      </Popup>

      {/* Popup de SERVICIOS */}
      <Popup isOpen={popupActivo === 'servicios'} onClose={cerrarPopup}>
        <h2>Historial de Técnicos</h2>
        <p>No tienes reparaciones pendientes.</p>
      </Popup>

       {/* Popup de CONTRASEÑA */}
       <Popup isOpen={popupActivo === 'password'} onClose={cerrarPopup}>
        <h2>Cambiar Contraseña</h2>
        <input type="password" placeholder="Nueva contraseña"/>
        <button className="btn">Guardar</button>
      </Popup>

      </div>
      <div className="section-preguntas-frecuentes">
        <h2>Pregunta frecuentes</h2>
        {datos.map((item, index) => (
        <div 
          key={index} 
          className={`acordeon-item ${activeIndex === index ? 'active' : ''}`}
        >
          <div className="acordeon-header" onClick={() => handleToggle(index)}>
            <h3>{item.titulo}</h3>
            <span className="icon">{activeIndex === index ? '−' : '+'}</span>
          </div>
          
          <div className="acordeon-content">
            <p>{item.contenido}</p>
          </div>
        </div>
      ))}
      </div>
    </>
    
    
  );
}

export default Sesion;