import logoUser from "../assets/images/iconUser.png";
import logoEmpresa from "../assets/images/logoEmpresa.png"
import { LuFileSignature, LuFilePlus2, LuFileClock } from 'react-icons/lu';
import '../assets/styles/homeStyle.css'
import NavPage from "../pages/NavPage";

const Home = () => {
    const dashboard = [
        {
            id: 1,
            title: 'historial',
            image: <LuFileClock className="icon" />
        },
        {
            id: 2,
            title: 'Generar Pedido',
            image: <LuFilePlus2 className="icon" />
        },
        {
            id: 3,
            title: 'Gestionar Pedido',
            image: <LuFileSignature className="icon" />
        }
    ]

    return (
        <div className="d-flex">
            <NavPage/>
            <section className="w-100 m-5">
                <div className='d-flex justify-content-between'>
                    <div>
                        <div className='d-flex align-items-center'>
                            <h1>Bienvenido/a</h1>
                            <div>
                                <img src={logoUser} alt='icono de usuario' />
                            </div>
                        </div>
                        <p className="fw-bolder">Usuario1</p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img src={logoEmpresa} alt='Logo empresa' />
                        </div>
                        <h2>FINNEGANS</h2>
                    </div>
                </div>
                <div className="mt-md-5">
                    <div className='d-flex justify-content-around'>
                        {dashboard.map((item) => (
                            <div key={item.id} className='contentItem d-flex flex-column align-items-center justify-content-center'>
                                {item.image}
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;