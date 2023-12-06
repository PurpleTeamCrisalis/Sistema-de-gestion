import { LuFilePlus2, LuFileClock } from 'react-icons/lu';
import '../assets/styles/homeStyle.css'
import NavComponent from "../pages/NavPage";
import { useAuthStore } from "../hooks/useAuthStore";
import HeaderComponent from './HeaderComponent';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const JumpingLetters = ({ text }) => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const splitText = text.trim().split('');
        setLetters(splitText);
    }, [text]);

    useEffect(() => {
        const spans = document.querySelectorAll('.jumping-letter');
        let delay = 0;

        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('jumping');
            }, delay);
            delay += 150; // Adjust this value to control the delay between each letter's animation
        });
    }, [letters]);

    return (
        <div className="jumping-text">
            {letters.map((letter, index) => (
                <span key={index} className="fw-bolder mx-auto h3 jumping-letter">
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </div>
    );
};

const Home = () => {
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
                        <JumpingLetters text="¡Bienvenido/a!" />
                        <span className="fw-bolder mx-auto h3">{user.username}</span>
                        <div className="mx-auto">
                            <div className='d-flex justify-content-around' style={{ marginTop: "-2rem" }}>
                                {dashboard.map((item) => (
                                    <div onClick={() => item.navigate()} key={item.id} className="e-card playing mx-5">
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