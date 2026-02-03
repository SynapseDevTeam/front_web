import './suscripcion.css';
import logoCheck from '../assets/check-icon.svg';
import logoCross from '../assets/cross-icon.png';
function Suscripcion() {
  return (
    <>
    <div className='banner-inicio'></div>
    <div className='plan-types'>
      <article className='plan'>
        <div className='plan-ico'>
          <p>FREEMIUM</p>
          <p>Gratis</p>
        </div>
        <button className="btn btn-descarga">Elegir plan</button>
        <div className="caracteristicas-planes">
          <p>Gestión de hasta 3 electrodomésticos desde una sola app.</p>
          <p>Alertas básicas (fallos comunes, revisiones recomendadas).</p>
          <p>Acceso a la Bóveda Digital(guardar facturas, garantias.manuales)</p>
          <p>Sin coste</p>
        </div>
      </article>

      <article className='plan'>
        <div className='plan-ico'>
          <p>7.99€/mes</p>
          <p>Premium</p>
        </div>
        <button className="btn btn-descarga">Elegir plan</button>
        <div className="caracteristicas-planes">
          <p>Electrodomésticos ilimitados.</p>
          <p>IA predictiva(anticipa averias antes de que ocurran)</p>
          <p>Diagnóstico por Realidad Aumentada </p>
          <p>Monitorización del consumo energético</p>
        </div>
      </article>

      <article className='plan'>
        <div className='plan-ico'>
          <p>12.99€/mes</p>
          <p>Premium +</p>
        </div>
        <button className="btn btn-descarga">Elegir plan</button>
        <div className="caracteristicas-planes">
          <p>Todo lo incluido en Premium.</p>
          <p>Sensores físicos enviados por Synapse</p>
          <p>Detección temprana de fallos graves.</p>
          <p>Experiencia “smart home” avanzada sin complicaciones técnicas.</p>
        </div>
      </article>
    </div>
    <div className="comparacion-planes-grid">
      <div className="tipo-plan">Free</div>
      <div className="tipo-plan">Premium</div>
      <div className="tipo-plan">Premium +</div>

      <div>Gestión ilimitada de electrodomésticos <img src={logoCross}></img></div>
      <div>Gestión ilimitada de electrodomésticos <img src={logoCheck}></img></div>
      <div>Gestión ilimitada de electrodomésticos <img src={logoCheck}></img></div>

      <div>Dashboard de Salud del Hogar<img src={logoCheck}></img></div>
      <div>Dashboard de Salud del Hogar <img src={logoCheck}></img></div>
      <div>Dashboard de Salud del Hogar<img src={logoCheck}></img></div>

      <div>Alertas Proactivas Inteligentes<img src={logoCross}></img></div>
      <div>Alertas Proactivas Inteligentes <img src={logoCheck}></img></div>
      <div>Alertas Proactivas Inteligentes <img src={logoCheck}></img></div>

      <div>Diagnóstico Guiado por Realidad Aumentada (AR)<img src={logoCross}></img></div>
      <div>Diagnóstico Guiado por Realidad Aumentada (AR)<img src={logoCheck}></img></div>
      <div>Diagnóstico Guiado por Realidad Aumentada (AR)<img src={logoCheck}></img></div>

      <div>Marketplace de Técnicos Optimizados<img src={logoCross}></img></div>
      <div>Marketplace de Técnicos Optimizados <img src={logoCross}></img></div>
      <div>Marketplace de Técnicos Optimizados <img src={logoCheck}></img></div>

      <div>Bóveda Digital del Hogar<img src={logoCheck}></img></div>
      <div>Bóveda Digital del Hogar <img src={logoCheck}></img></div>
      <div>Bóveda Digital del Hogar <img src={logoCheck}></img></div>

      <div>Integración de chatbot<img src={logoCross}></img></div>
      <div>Integración de chatbot <img src={logoCheck}></img></div>
      <div>Integración de chatbot <img src={logoCheck}></img></div>
    </div>
</>
  );
}

export default Suscripcion;