import React, { useState } from 'react';
import './productos.css';
import iconoBusqueda from '../assets/search.svg'; 
import imagen from './imgLavadora.jpg';




function Productos() {

  const [productos] = useState([
    { 
      id: 1, 
      nombre: "Lavadora Industrial", 
      info: "Industrial", 
      precio: 4500, 
      imagen: imagen,
      conectividad: ["WiFi"],
      Eficiencia: "A"
    },
    { 
      id: 2, 
      nombre: "Secadora Industrial", 
      info: "Industrial", 
      precio: 3200, 
      imagen: imagen,
      conectividad: ["Bluetooth"], 
      Eficiencia: "B"
    }
  ]);

  // --- ESTADOS ---

  // 1. Estado para la barra de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // 2. Estado para los filtros de Conectividad
  const [filtrosConectividad, setFiltrosConectividad] = useState({
    wifi: false,
    bluetooth: false
  });

  // 3. Estado para los filtros de Eficiencia
  const [filtrosEficiencia, setFiltrosEficiencia] = useState({
    A: false, B: false, C: false, D: false, E: false
  });

  // --- MANEJADORES ---

  // Cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    setBusqueda(e.target.value);
  };

  // Cambio en checkboxes de Conectividad
  const handleConectividadChange = (e) => {
    const { name, checked } = e.target;
    setFiltrosConectividad({
      ...filtrosConectividad,
      [name]: checked 
    });
  };

  // Cambio en checkboxes de Eficiencia
  const handleEficienciaChange = (e) => {
    const { name, checked } = e.target;
    setFiltrosEficiencia({
      ...filtrosEficiencia,
      [name]: checked
    });
  };

  // --- LÓGICA DE FILTRADO ---
  
  const productosFiltrados = productos.filter((producto) => {
    //  Filtro por Buscador
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());

    //  Filtro por Conectividad
    // Verificamos si los filtros están activos. Si están activos, el producto debe tener esa tecnología.
    const filtroWifi = filtrosConectividad.wifi    
    ? producto.conectividad.some(c => c.toLowerCase() === 'wifi') 
        : true;
    const filtroBluetooth = filtrosConectividad.bluetooth 
        ? producto.conectividad.some(c => c.toLowerCase() === 'bluetooth') 
        : true;

    //  Filtro por Eficiencia
    const hayFiltroEficienciaActivo = Object.values(filtrosEficiencia).some(val => val === true);
    let coincideEficiencia = true;

    if (hayFiltroEficienciaActivo) {
        // Verifica si la eficiencia del producto está marcada como true en el estado
        coincideEficiencia = filtrosEficiencia[producto.Eficiencia];
    }

    // El producto pasa si cumple TODAS las condiciones
    return coincideBusqueda && filtroWifi && filtroBluetooth && coincideEficiencia;
  });
  
  return (
    <div className="layout">
      
      {/* Barra lateral */}
      <aside className="sidebar">
        <h3>Filtros</h3>
        <div className="linea-separadora"></div>
        
        
        <div className="filtro-grupo">
            <h4>Categoría</h4>
            <p>Industrial</p>
            <p>Sensores</p>
            <p>Hogar</p>
        </div>


<div className="filtro-grupo">
    <h4>Conectividad</h4>
    
    <label className="filtro-label">
        <input type="checkbox" className="filtro-input" name="wifi"                           // <--- IMPORTANTE
                    checked={filtrosConectividad.wifi}   
                    onChange={handleConectividadChange} /> WiFi
    </label>
    
    <label className="filtro-label">
        <input type="checkbox" className="filtro-input" name="bluetooth"                           // <--- IMPORTANTE
                    checked={filtrosConectividad.bluetooth}    
                    onChange={handleConectividadChange}/> Bluetooth
    </label>
</div>

<div className="filtro-grupo">
    <h4>Eficiencia</h4>
    
    <label className="filtro-label">
        <input type="checkbox" className="filtro-input"name="A"                      
                    checked={filtrosEficiencia.A} 
                    onChange={handleEficienciaChange} /> A
    </label>
    
    <label className="filtro-label">
        <input type="checkbox" className="filtro-input"name="B"                      
                    checked={filtrosEficiencia.B} 
                    onChange={handleEficienciaChange} /> B
    </label>
    
    <label className="filtro-label">
        <input type="checkbox" className="filtro-input"name="C"                      
                    checked={filtrosEficiencia.C} 
                    onChange={handleEficienciaChange} /> C
    </label>
    
    <label className="filtro-label">
        <input type="checkbox" className="filtro-input" name="D"                     
                    checked={filtrosEficiencia.D} 
                    onChange={handleEficienciaChange} /> D
    </label>
    
    <label className="filtro-label">
        <input type="checkbox" className="filtro-input" name="E"                     
                    checked={filtrosEficiencia.E} 
                    onChange={handleEficienciaChange} /> E
    </label>
</div>

        <div className="linea-separadora"></div>
      </aside>

      <main className="main-content">

        
        {/* BUSCADOR */}
        <header className="header-search">
            <div className="search-bar">
                <img src={iconoBusqueda} alt="Buscar" className="icon" />
                <input type="text" placeholder="Buscar productos..." value={busqueda}                 // <--- IMPORTANTE
                    onChange={handleSearchChange}/>
            </div>
        </header>

        {/* productos */}
      <div className="grid-productos">
          
          {productosFiltrados.map((item) => (
            <div key={item.id} className="product-card">
              
              {/*img producto */}
              <div className="card-image-container">
                {/* Usamos item.imagen para que pueda ser una distinta */}
                <img src={imagen} alt={"lavadora"} />
              </div>
              
              {/* Información producto */}
              <div className="card-info">
                <h3 className="card-title">{item.nombre}</h3>
                <p className="card-category">{item.info}</p>
                <p className="card-price">{item.precio} €</p>
              </div>

            </div>
          ))}

        </div>

      </main>

    </div>      
  );
}

export default Productos;