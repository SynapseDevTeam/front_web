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
      conectividad: ["WiFi"], 
      eficiencia: "A", 
      imagen: imagen 
    },
    { 
      id: "fb-2", 
      modelo: "Sensor IoT Pro", 
      marca: "Babyliss", 
      precio: "1200 €", 
      conectividad: ["Bluetooth"], 
      eficiencia: "B", 
      imagen: imagen 
    }
  ];

  // ---  ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [precioMaximo, setPrecioMaximo] = useState(10000);

  const [filtrosConectividad, setFiltrosConectividad] = useState({ wifi: false, bluetooth: false });
  const [filtrosEficiencia, setFiltrosEficiencia] = useState({ A: false, B: false, C: false, D: false, E: false });
  const [filtrosMarca, setFiltrosMarca] = useState({
    AEG: false, Babyliss: false, Balay: false, Beko: false, Bosch: false
  });

  // ---  INTEGRACIÓN BACKEND ---
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://34.228.45.59:8080/catalog/search?size=50'); 
      if (!response.ok) throw new Error("Error: " + response.status);
      const result = await response.json();
      
      // Acceso correcto al array de datos según la estructura de la API
      if (result && Array.isArray(result.data)) {
        setProductos(result.data); 
      }
    } catch (err) {
      console.error("Error en la conexión:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []); 

  // ---  MANEJADORES ---
  const handleSearchChange = (e) => setBusqueda(e.target.value);
  const handlePrecioChange = (e) => setPrecioMaximo(parseInt(e.target.value));
  
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

  // ---  LÓGICA DE FILTRADO UNIFICADA ---
  // Combinamos fallback y productos de la API antes de filtrar
  const todosLosProductos = [...productosFallback, ...productos];

  const productosFiltrados = todosLosProductos.filter((producto) => {
    // Limpieza de precio para comparación numérica
    const precioNumerico = typeof producto.precio === 'string' 
      ? parseInt(producto.precio.replace(/[^0-9]/g, "")) 
      : (producto.precio || 0);

    const coincidePrecio = precioNumerico <= precioMaximo;

    // Filtro Buscador 
    const nombreParaFiltrar = producto.modelo || producto.nombre || ""; 
    const coincideBusqueda = nombreParaFiltrar.toLowerCase().includes(busqueda.toLowerCase());

    // Filtro Conectividad 
    const proConect = Array.isArray(producto.conectividad) 
        ? producto.conectividad.join(", ") 
        : (producto.conectividad || "");
    
    const filtroWifi = filtrosConectividad.wifi ? proConect.toLowerCase().includes("wifi") : true;
    const filtroBluetooth = filtrosConectividad.bluetooth ? proConect.toLowerCase().includes("bluetooth") : true;
    
    // Filtro Marca
    const hayFiltroMarca = Object.values(filtrosMarca).some(v => v);
    const coincideMarca = hayFiltroMarca ? filtrosMarca[producto.marca] : true;

    // Filtro Eficiencia
    const hayFiltroEficiencia = Object.values(filtrosEficiencia).some(v => v);
    const valorEficiencia = producto.eficiencia || producto.Eficiencia; 
    const coincideEficiencia = hayFiltroEficiencia ? filtrosEficiencia[valorEficiencia] : true;

    return coincideBusqueda && coincidePrecio && coincideMarca && coincideEficiencia && filtroWifi && filtroBluetooth;
  });

  // ---  RENDERIZADO ---
  return (
    <div className="layout">
      <aside className="sidebar">
        <h3>Filtros</h3>
        <div className="linea-separadora"></div>

        {/* Barra de Precio */}
        <div className="filtro-grupo">
          <h4>Precio Máximo</h4>
          <input type="range" min="0" max="10000" step="100" value={precioMaximo} onChange={handlePrecioChange} className="price-slider" />
          <p>Hasta: <strong>{precioMaximo} €</strong></p>
        </div>

        <div className="linea-separadora"></div>
        
        <div className="filtro-grupo">
          <h4>Conectividad</h4>
          <label className="filtro-label">
            <input type="checkbox" name="wifi" checked={filtrosConectividad.wifi} onChange={handleConectividadChange} /> WiFi
          </label>
          <label className="filtro-label">
            <input type="checkbox" name="bluetooth" checked={filtrosConectividad.bluetooth} onChange={handleConectividadChange} /> Bluetooth
          </label>
        </div>

        <div className="filtro-grupo">
          <h4>Marcas</h4>
          {Object.keys(filtrosMarca).map((marca) => (
            <label key={marca} className="filtro-label">
              <input type="checkbox" name={marca} checked={filtrosMarca[marca]} onChange={handleMarcaChange} /> {marca}
            </label>
          ))}
        </div>

        <div className="filtro-grupo">
          <h4>Eficiencia</h4>
          {['A', 'B', 'C', 'D', 'E'].map(letra => (
            <label key={letra} className="filtro-label">
              <input type="checkbox" name={letra} checked={filtrosEficiencia[letra]} onChange={handleEficienciaChange} /> {letra}
            </label>
          ))}
        </div>

        <div className="linea-separadora"></div>
        <div className="filtro-grupo">
          <h4>Estadísticas</h4>
          <p>Total: {todosLosProductos.length}</p>
          <p>Filtrados: {productosFiltrados.length}</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="header-search">
            <div className="search-bar">
                <img src={iconoBusqueda} alt="Buscar" className="icon" />
                <input type="text" placeholder="Buscar productos..." value={busqueda} onChange={handleSearchChange}/>
            </div>
        </header>

        <div className="grid-productos">
          {loading && productos.length === 0 ? (
            <p>Cargando productos del servidor...</p>
          ) : (
            productosFiltrados.map((item) => (
              <div key={item.uuid || item.id} className="product-card">
                <div className="card-image-container">
                  <img src={item.imagen || imagen} alt={item.modelo} onError={(e) => { e.target.src = imagen; }} />
                </div>
                <div className="card-info">
                  <h3 className="card-title">{item.modelo || item.nombre}</h3>
                  <p className="card-category">{item.marca}</p>
                  <p className="card-price">{item.precio}</p> 
                </div>
              </div>
            ))
          )}
          {!loading && productosFiltrados.length === 0 && <p>No hay coincidencias.</p>}
        </div>
      </main>
    </div>      
  );
}

export default Productos;