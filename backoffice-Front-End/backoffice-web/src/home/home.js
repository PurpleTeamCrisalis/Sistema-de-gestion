import logoUser from "./img/iconUser.png";
import logoEmpresa from "./img/logoEmpresa.png"
import imgEditar from "./img/editarPedidos.png"
import imgCrear from "./img/generarPedidos.png"
import imgHistorial from "./img/historialPedidos.png"
import './style/style.css' 

const Home = () =>{
    const dashboard = [
        {
            id: 1,
            title: 'historial',
            image: imgHistorial
        },
        {
            id: 2,
            title: 'Generar Pedido',
            image: imgCrear
        },
        {
            id: 3,
            title: 'Gestionar Pedido',
            image: imgEditar
        }
    ]

    return(
        <>
            <section>
                <div className='d-flex justify-content-between'>
                    <div>
                        <div className='d-flex'>
                            <h1>Bienvenido/a</h1>
                            <img src={logoUser} alt='icono de usuario'/>
                        </div>
                        <p>Usuario1</p>
                    </div>
                    <div className='d-flex'>
                        <div>
                            <img src={logoEmpresa} alt='Logo empresa'/>
                        </div>
                        <h2>Finnegans</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className='d-flex justify-content-around'>
                    {dashboard.map((item) => (
                        <div key={item.id} className='contentItem d-flex flex-column align-items-center justify-content-center'>
                            <img src={item.image} alt={`logo ${item.title}`} width='65' />
                            <h3>{item.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home;