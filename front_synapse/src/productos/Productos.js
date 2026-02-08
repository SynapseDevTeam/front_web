import React, { useState, useEffect } from 'react'; 
import './productos.css';
import iconoBusqueda from '../assets/search.svg'; 
import imagen from './imgLavadora.jpg';

function Productos() {
  // --- 1. PRODUCTOS DE RESPALDO por si falla el backend ---
  const productosFallback = [
    { 
      id: "fb-1", 
      modelo: "Lavadora Industrial Plus", 
      marca: "AEG", 
      precio: "4500 €", 
      conectividad: "WiFi", 
      eficiencia: "A", 
      imagen: imagen 
    },
    { 
      id: "fb-2", 
      modelo: "Sensor IoT Pro", 
      marca: "Babyliss", 
      precio: "1200 €", 
      conectividad: "Bluetooth", 
      eficiencia: "B", 
      imagen: imagen 
    }
  ];

  // --- 2. ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //estado de precios
  const [precioMaximo, setPrecioMaximo] = useState(10000);
// filtros de conectividad, eficiencia y marca
  const [filtrosConectividad, setFiltrosConectividad] = useState({ wifi: false, bluetooth: false });
  const [filtrosEficiencia, setFiltrosEficiencia] = useState({ A: false, B: false, C: false, D: false, E: false });
  const [filtrosMarca, setFiltrosMarca] = useState({
    AEG: false, Babyliss: false, Balay: false, Beko: false, Bosch: false
  });

  // --- 3. INTEGRACIÓN BACKEND ---
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://34.228.45.59:8080/catalog/search?size=50'); 
      if (!response.ok) throw new Error("Error: " + response.status);
      const data = await response.json();
      
      if (data && Array.isArray(data.data)) {
        setProductos(data.data); 
      }
    } catch (err) {
      console.error("Error en la conexión:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []); 

  // --- 4. MANEJADORES ---
  const handleSearchChange = (e) => setBusqueda(e.target.value);
  const handleConectividadChange = (e) => {
    const { name, checked } = e.target;
    setFiltrosConectividad(prev => ({ ...prev, [name]: checked }));
  };
  const handleEficienciaChange = (e) => {
    const { name, checked } = e.target;
    setFiltrosEficiencia(prev => ({ ...prev, [name]: checked }));
  };
  const handleMarcaChange = (e) => {
    const { name, checked } = e.target;
    setFiltrosMarca(prev => ({ ...prev, [name]: checked }));
  };
  // Manejador para el slider de precio
  const handlePrecioChange = (e) => {
    setPrecioMaximo(parseInt(e.target.value));
  };

  // --- 5. LÓGICA DE FILTRADO UNIFICADA ---
  const todosLosProductos = [...productosFallback, ...productos];

  const productosFiltrados = todosLosProductos.filter((producto) => {

    const precioNumerico = typeof producto.precio === 'string' 
      ? parseInt(producto.precio.replace(/[^0-9]/g, "")) 
      : producto.precio;

    // Filtro Precio
    const coincidePrecio = precioNumerico <= precioMaximo;

    // Filtro Buscador
    const nombreParaFiltrar = producto.modelo || ""; 
    const coincideBusqueda = nombreParaFiltrar.toLowerCase().includes(busqueda.toLowerCase());

    // Filtro Conectividad
    const tieneWifi = producto.conectividad === "WiFi";
    const tieneBluetooth = producto.conectividad === "Bluetooth";
    const filtroWifi = filtrosConectividad.wifi ? tieneWifi : true;
    const filtroBluetooth = filtrosConectividad.bluetooth ? tieneBluetooth : true;

    // Filtro Marca
    const hayFiltroMarcaActivo = Object.values(filtrosMarca).some(val => val === true);
    const coincideMarca = hayFiltroMarcaActivo ? filtrosMarca[producto.marca] : true;

    // Filtro Eficiencia
    const hayFiltroEficienciaActivo = Object.values(filtrosEficiencia).some(val => val === true);
    const coincideEficiencia = hayFiltroEficienciaActivo ? filtrosEficiencia[producto.eficiencia] : true;

    return coincideBusqueda && coincidePrecio && filtroWifi && filtroBluetooth && coincideMarca && coincideEficiencia;
  });

  // --- 6. RENDERIZADO ---
  return (
    <div className="layout">
      <aside className="sidebar">
        <h3>Filtros</h3>
        <div className="linea-separadora"></div>

        {/* Módulo de Filtro de Precio */}
        <div className="filtro-grupo">
          <h4>Precio Máximo</h4>
          <input 
            type="range" 
            min="0" 
            max="10000" 
            step="100"
            value={precioMaximo} 
            onChange={handlePrecioChange}
            className="price-slider"
          />
          <p>Hasta: <strong>{precioMaximo} €</strong></p>
        </div>

        <div className="linea-separadora"></div>
        
        <div className="filtro-grupo">
          <h4>Marcas Disponibles</h4>
          {Object.keys(filtrosMarca).map((marca) => (
            <label key={marca} className="filtro-label">
              <input 
                type="checkbox" 
                className="filtro-input" 
                name={marca}
                checked={filtrosMarca[marca]}
                onChange={handleMarcaChange} 
              /> {marca}
            </label>
          ))}
        </div>

        <div className="linea-separadora"></div>
        <div className="filtro-grupo">
          <h4>Estadísticas</h4>
          <p>Total: {todosLosProductos.length} dispositivos</p>
          <p>Encontrados: {productosFiltrados.length}</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="header-search">
            <div className="search-bar">
                <img src={iconoBusqueda} alt="Buscar" className="icon" />
                <input 
                  type="text" 
                  placeholder="Buscar productos..." 
                  value={busqueda} 
                  onChange={handleSearchChange}
                />
            </div>
        </header>

        <div className="grid-productos">
          {productosFiltrados.map((item) => (
            <div key={item.uuid || item.id} className="product-card">
              <div className="card-image-container">
                <img 
                  src={item.imagen || imagen} 
                  alt={item.modelo} 
                  onError={(e) => { e.target.src = "/assets/default-placeholder.png"; }} 
                />
              </div>
              <div className="card-info">
                <h3 className="card-title">{item.modelo}</h3>
                <p className="card-category">{item.marca}</p>
                <p className="card-price">{item.precio}</p> 
              </div>
            </div>
          ))}
          {productosFiltrados.length === 0 && <p>No hay productos que coincidan con los filtros.</p>}
        </div>
      </main>
    </div>      
  );
}

export default Productos;