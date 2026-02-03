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
      imagen: imagen
    }
  ]);
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

{/* MIRAR A VER SI LO PUEDO HACER CON UNA CLASE  */}
        <div className="filtro-grupo">
            <h4>Conectividad</h4>
            <label style={{display: 'block', marginBottom: '5px'}}>
                <input type="checkbox" style={{marginRight: '8px'}} /> WiFi
            </label>
            <label style={{display: 'block', marginBottom: '5px'}}>
                <input type="checkbox" style={{marginRight: '8px'}} /> Bluetooth
            </label>
            
        </div>

        <div className="filtro-grupo">
            <h4>Eficiencia</h4>
            <label style={{display: 'block', marginBottom: '5px'}}>
                <input type="checkbox" style={{marginRight: '8px'}} /> A
            </label>
            <label style={{display: 'block', marginBottom: '5px'}}>
                <input type="checkbox" style={{marginRight: '8px'}} /> B
            </label>
            <label style={{display: 'block', marginBottom: '5px'}}>
                <input type="checkbox" style={{marginRight: '8px'}} /> C
            </label>
            <label style={{display: 'block', marginBottom: '5px'}}>
                <input type="checkbox" style={{marginRight: '8px'}} /> D
            </label>
            <label style={{display: 'block', marginBottom: '5px'}}>
                <input type="checkbox" style={{marginRight: '8px'}} /> E
            </label>
        </div>

        <div className="linea-separadora"></div>
      </aside>

      <main className="main-content">
        
        {/* BUSCADOR */}
        <header className="header-search">
            <div className="search-bar">
                <img src={iconoBusqueda} alt="Buscar" className="icon" />
                <input type="text" placeholder="Buscar productos..." />
            </div>
        </header>

        {/* productos */}
      <div className="grid-productos">
          
          {productos.map((item) => (
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