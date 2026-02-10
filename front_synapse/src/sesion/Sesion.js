import logo from "../assets/perfil.png";
import { useState, useEffect } from "react";
import './sesion.css';
import Popup from "../popUp/PopUp";
import { Link, useNavigate } from "react-router-dom";

function Sesion() {
  const navegar = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [popupActivo, setPopupActivo] = useState(null);

  // Estado para guardar los datos mientras se editan en el Popup
  const [datosEditables, setDatosEditables] = useState({
    newfullName:'',
    fullName: '',
    telephone: '',
    address: ''
  });

  // ESTADOS PARA LA API
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const API_URL = "http://34.228.45.59:8080";

  const jwtUsuario = JSON.parse(localStorage.getItem('jwtUsuario')) || {};

  useEffect(() => {
    const cargarPerfil = async () => {
      const token = localStorage.getItem('token');

      // 1. Si no hay token o no hay UUID en el objeto, al login
      if (!token || !jwtUsuario.uuid) {
        navegar('/login');
        return;
      }

      try {
        // 2. Usamos jwtUsuario.uuid en la URL
        const respuesta = await fetch(`${API_URL}/profiles/${jwtUsuario.uuid}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (respuesta.ok) {
          const data = await respuesta.json();
          setDatosUsuario(data);
          setDatosEditables({
            fullName: data.fullName || '',
            telephone: data.telephone || '',
            address: data.address || '',
            newfullName: ''
          });
          setCargando(false);
        } else {
          // Si el token falló, limpiamos todo y fuera
          manejarLimpiezaYSalir();
        }
      } catch (error) {
        console.error("Error al conectar con la API:", error);
        navegar('/login');
      }
    };

    cargarPerfil();
  }, [navegar]);

  const cerrarPopup = () => setPopupActivo(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  // --- NUEVO: Función centralizada para borrar sesión ---
  const manejarLimpiezaYSalir = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('jwtUsuario'); // Borramos el objeto completo
    navegar('/login');
  };

  // Función para cerrar sesión
  const manejarLogout = () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('uuid');
      navegar('/login');
    }
  };

  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const cambiarPassword = async () => {
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    // LEEMOS DIRECTAMENTE DEL ESTADO
    const { oldPassword, newPassword } = formPassword;

    if (newPassword.match(regexContrasena)) {
      try {
        const respuesta = await fetch(`${API_URL}/auth/change-password`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          },
          body: JSON.stringify({
            "oldPassword": oldPassword,
            "newPassword": newPassword
          })
        });

        if (respuesta.ok) {
          alert("Contraseña cambiada con éxito");
          setPopupActivo(null); // Cerramos el popup
          setFormPassword({ oldPassword: "", newPassword: "" }); // Limpiamos inputs
        } else {
          alert("Error al cambiar la contraseña:"+respuesta.statusText);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("La contraseña no es válida (Mín 8 caracteres, 1 Mayus, 1 Num)");
    }
  };



  const editarDatos = async () => {

    const {newfullName,telephone,address}=datosEditables;
    const token = localStorage.getItem('token');
    console.log(datosEditables);
    const respuesta = await fetch(`${API_URL}/profiles/${jwtUsuario.uuid}`, {
      method: 'PATCH',
      headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // ✅ AQUÍ DENTRO DE HEADERS
    },
      body: JSON.stringify({
        "fullName": newfullName,
        "telephone": telephone,
        "address": address
      })
    });

    if(respuesta.ok){
      alert("Datos cambiados con exito");
      setDatosEditables({fullName:datosEditables.newfullName,newfullName:""});
    }else{
       alert("error al modificar los datos: "+respuesta.status);
       
    }
  };
  // Datos del acordeón (se mantienen igual)
  const datosFaq = [

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

  // Si está cargando la API, mostramos un mensaje
  if (cargando) {
    return <div style={{ textAlign: 'center', marginTop: '250px' }}>Verificando credenciales...</div>;
  }

  return (
    <>
      <div className='banner-intro'></div>
      <div className="vista-perfil">
        <div className="lateral-grid">
          <p onClick={() => setPopupActivo('pago')}>Método de pago</p>
          <p onClick={() => setPopupActivo('dispositivos')}>Dispositivos asociados</p>
          <p onClick={manejarLogout}>Cerrar sesión</p>
        </div>

        <div className="info-general-acc">
          <img src={logo} alt="Perfil"></img>

          {/* DATOS DEL USUARIO API */}
          <p className="plan-select">Plan seleccionado: {datosUsuario?.planName || 'Básico'}</p>
          <p>Nombre y apellidos:<strong id="fullNameText"> {datosUsuario?.fullName || 'Usuario'}</strong></p>
          <p>Usuario: <strong>{jwtUsuario.username || 'Usuario'}</strong></p>
          <p>Correo: <strong>{jwtUsuario.email || 'No disponible'}</strong></p>

          <p>Teléfono:<strong id="telfText">{datosUsuario?.telephone || 'Sin teléfono'}</strong> </p>
          <p>dirección:<strong id="addressText">{datosUsuario?.address || 'Sin dirección'}</strong>  </p>
          
          <div>
            <button className="btn btn-delete" >Eliminar cuenta (En desarrollo)</button>
            <button className="btn btn-edit" onClick={() => setPopupActivo('editarPerfil')}>Editar</button>
          </div>
        </div>

        <div className="lateral-grid">
          <p onClick={() => setPopupActivo('servicios')}>Servicios y técnicos</p>
          <Link to="/suscripcion"><p>Cambiar suscripción</p></Link>
          <p onClick={() => setPopupActivo('password')}>Cambiar contraseña</p>
        </div>
        {/**dispositivos asociados */}
        <Popup isOpen={popupActivo === 'dispositivos'} onClose={cerrarPopup}>
          <h2>Dispositivos Conectados</h2>
          <ul>
            <li>Gestiona tus dispositivos desde aquí.</li>
          </ul>
        </Popup>
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
          <input type="password" placeholder="Antigua contraseña" onChange={(e) => setFormPassword({
            ...formPassword,//para que no cambie el valor de la otra variable
            oldPassword: e.target.value
          })} />
          <input type="password" placeholder="Nueva contraseña" onChange={(e) => setFormPassword({
            ...formPassword,//para que no cambie el valor de la otra variable
            newPassword: e.target.value
          })} />
          <button className="btn" onClick={cambiarPassword}>Guardar</button>
        </Popup>

        {/* Popup de MÉTODOS DE PAGO */}
        <Popup isOpen={popupActivo === 'editarPerfil'} onClose={cerrarPopup}>
          <div className="forms-popUp">

          <h2>Editar datos personales</h2>
          <label>Nombre y apellidos:</label>
          <input  type="text" placeholder={datosEditables.fullName} 
           
          onChange={(e) => setDatosEditables({
            ...datosEditables,//para que no cambie el valor de la otra variable
            newfullName: e.target.value
          })}/>

          <label>Teléfono:</label>
          <input  type="text" value={datosEditables.telephone} placeholder="telefono" onChange={(e) => setDatosEditables({
            ...datosEditables,//para que no cambie el valor de la otra variable
            telephone: e.target.value
          })}/>

          <label>Dirección:</label>
          <input type="text" value={datosEditables.address} placeholder="direccion" onChange={(e) => setDatosEditables({
            ...datosEditables,//para que no cambie el valor de la otra variable
            address: e.target.value
          })}/>

          <button className="btn" onClick={editarDatos}>Guardar Cambios</button>
          </div>
        </Popup>
      </div>

      <div className="section-preguntas-frecuentes">
        <h2>Preguntas frecuentes</h2>
        {datosFaq.map((item, index) => (
          <div key={index} className={`acordeon-item ${activeIndex === index ? 'active' : ''}`}>
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