import logoUser from "../assets/images/iconUser.png";
import logoEmpresa from "../assets/images/logoEmpresa.png"
import { LuFileSignature, LuFilePlus2, LuFileClock } from 'react-icons/lu';
import '../assets/styles/homeStyle.css'
import NavComponent from "../pages/NavPage";
import { useAuthStore } from "../hooks/useAuthStore";
import HeaderComponent from './HeaderComponent';
import { useNavigate } from "react-router-dom";

const Home = () =>
{
    const { user } = useAuthStore()
    const navigate = useNavigate();

    const dashboard = [
        {
            id: 1,
            title: 'Registrar Cliente',
            image: <LuFileClock className="icon" />,
            navigate: () => navigate("/client")
        },
        {
            id: 2,
            title: 'Generar Pedido',
            image: <LuFilePlus2 className="icon" />,
            navigate: () => navigate("/order/newOrder")
        }
    ]

    return (
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    <NavComponent />
                    <section className="mx-auto mt-5 d-flex" style={{ flexDirection: "column" }}>
                        <h1 className="mx-auto mt-5 h2" >Bienvenido/a</h1>
                        <p className="fw-bolder mx-auto h3">{user.username}</p>
                        <div className="mx-auto">
                            <div className='d-flex justify-content-around' style={{ marginTop: "-2rem" }}>
                                {dashboard.map((item) => (
                                <div onClick={() => item.navigate()} key={item.id} class="e-card playing mx-5">
                                    <div className="image"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="infotop" style={{ marginTop: "-3rem" }}>
                                        {item.image}
                                        <div style={{ marginTop: "-1rem" }}>{item.title}</div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home;