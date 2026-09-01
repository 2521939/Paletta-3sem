import './Footer.css'
import Inicio from './Inicio';
import Sobre from './Sobre';
import Contato from './Contato'
import { useState } from 'react'

function Footer() {
const [content, setContent] = useState("inicio")
    return (
        <>

        {/* Lembrar de colocar tudo isso no APP.jsx já que tem que estar funcionando em tudo esse useState */}
        <div>
        {content === 'inicio' && <Inicio/>}
        {content === 'sobre' && <Sobre />}
        {content === 'contato' && <Contato />}
        </div>


        <footer className="rodape">
            <p className="copyright">© 2026 Paletta. Todos os direitos reservados.</p>
            <nav className="menu-auth">

            {/*Lembrar de consertar o css de tudo duh, e tbm consertar o botao pra parecer o a do footer.css*/}
                <button className='botaotexto' onClick={() => setContent('sobre')}>Sobre</button>
                <button className='botaotexto' onClick={() => setContent('contato')}>Contato</button>
            </nav>
        </footer>
        </>
    );
};
export default Footer