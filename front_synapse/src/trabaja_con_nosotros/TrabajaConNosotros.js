import React, { useState } from 'react';
import './TrabajaConNosotros.css';
import Logo from '../assets/Logo-Synapse.png';


function TrabajaConNosotros() {
  const [datos, setDatos] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    cuentanosSobreTi: ''
  });

  const manejarCambio = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    console.log("Datos enviados: ", datos);
    alert(`¡Gracias ${datos.nombre}! Tu solicitud ha sido recibida.`);
  };

  return (
    <div className="pagina-completa">
      {/* SECCIÓN DEL BANNER */}
      <div className="banner-inicio">
        <h1>Únete a nuestro equipo</h1>
      </div>

    <div className="pagina-contacto">
      <div className="contenedor-principal">

        {/* FORMULARIO */}
        <div className="seccion-formulario">
          <form onSubmit={enviarFormulario} className="formulario">
            <h2>Trabaja con Nosotros</h2>
            
            <div className="grupo-input">
              <label>Nombre</label>
              <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} required />
            </div>

            <div className="grupo-input">
              <label>Apellidos</label>
              <input type="text" name="apellidos" value={datos.apellidos} onChange={manejarCambio} required />
            </div>

            <div className="grupo-input">
              <label>Email</label>
              <input type="email" name="correo" value={datos.correo} onChange={manejarCambio} required />
            </div>

            <div className="grupo-input">
              <label>Teléfono</label>
              <input type="tel" name="telefono" value={datos.telefono} onChange={manejarCambio} />
            </div>

            <div className="grupo-input">
              <label>Cuéntanos sobre ti</label>
              <textarea name="cuentanosSobreTi" value={datos.cuentanosSobreTi} onChange={manejarCambio} rows="4"></textarea>
            </div>

            <div className="grupo-input">
              <label>Enviar CV</label>
              <input type="file" name="enviarCv"/>
            </div>

            <button type="submit" className="boton-enviar btn-info">Enviar Solicitud</button>
          </form>
        </div>

        {/*IMAGEN */}
        <div className="seccion-imagen">
          <img src={Logo} alt="Trabaja con nosotros" />
        </div>

      </div>
    </div>
    </div>
  );
}

export default TrabajaConNosotros;