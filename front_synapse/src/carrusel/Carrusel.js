import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import './carrusel.css';
import { Autoplay } from 'swiper/modules';

const Carrusel = ({ slidesPerView = 1, pagination = { clickable: true },duracionTransicion=2000 ,delay=7000,listaSlides = [<p>default 1</p>,<p>default 2</p>,<p>default 3</p>,<p>default 4</p>] ,colab=false}) => {
    
    const dominios = ['apple.com', 'amazon.com', 'microsoft.com', 
                      'tesla.com','samsung.com','bosch.com',
                      'siemens.com','balay.com','toshiba.com',
                      'philips.com','lg.com','panasonic.com'];
    const token = 'pk_DpolOPIZSyWFXfpTHZ_8ZQ';
    
    return (
    <Swiper
      modules={[Navigation, Pagination,Autoplay]} // Activamos flechas y puntitos
      spaceBetween={50}                  // Espacio entre slides
      slidesPerView={slidesPerView}      // Cuántos slides ver a la vez
      navigation                         // Habilita flechas
      speed={duracionTransicion} // La animación durará 1 segundo (más suave)
      autoplay={{
        delay: delay, // Se queda quieta 4 segundos
        disableOnInteraction: false,
      }}
      loop={true}                      
      pagination={pagination}            // Habilita puntos clicables
    >
        {
        colab ? (

            dominios?.map((colaboradores)=>(
               <SwiperSlide><img src={`https://img.logo.dev/${colaboradores}?token=${token}&size=200`} className='colaborador'></img></SwiperSlide> 
            ))
        ):
        (
        listaSlides?.map((slide)=>(
            <SwiperSlide><div className='banner-center'>{slide}</div></SwiperSlide>
        ))
        )
        }
    </Swiper>
    
  );
};

export default Carrusel;