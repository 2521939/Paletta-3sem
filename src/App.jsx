import './App.css'
import './Header.css'
import './Footer.css'
import './Inicio.css'
import { useState } from 'react'
import { useRef } from 'react';
import './Login.css'
import Sobre from './Sobre'
import Contato from './Contato'
import Explorar from './Explorar'

function App() {
const dialogRef = useRef(null);
    
const abrirModal = () => {
  dialogRef.current.showModal();
};
    
const fecharModal = () => {
  dialogRef.current.close();
};


const [content, setContent] = useState("inicio")
  return (
    <>

       <header className="cont-cabecalho">
        <button className="botaotextologo item-cabecalho logo-cabecalho" onClick={() => setContent('inicio')}>Paletta</button>
        <button className="item-cabecalho login-cabecalho botaotexto" onClick={abrirModal}>Login</button>
        <button className="item-cabecalho register-cabecalho botaotexto" id='registro'>Register</button>

     </header>
     
     {/*Campo de Login (Modal)*/}
<dialog ref={dialogRef} className="modal-de-login">
    <div className="header-modal-login" >
        <h2 className="login-header-texto">Login</h2>
        <button className="fecharbtn" onClick={fecharModal}>X</button>
    </div>

    <div className="campos">
        <div className="campo-nome-email">
            <label for="username">Usuário / Email: </label>
            <input type="text" placeholder="Nome ou email"/>
        </div>  

        <div className="campo-senha">
            <label for="senha">Senha: </label>
            <input type="password" placeholder="Digite sua Senha"/>
            <div className="container-botao-entrar-teste">
        <button className="entrar-botao">Entrar</button>
            </div>
        </div>
    </div>
</dialog>



    {/* Lembrar de colocar tudo isso no APP.jsx já que tem que estar funcionando em tudo esse useState */}
    <div>
    {content === 'sobre' && <Sobre />}
    {content === 'contato' && <Contato />}
    {content === 'explorar' && <Explorar />}
    {content === 'inicio' && <>
    {/* Frase Principal */}
    <section class="cont-frasep">
    <h1 class="item-frasep">Destaques</h1>
    </section>
    {/* Destaques Semanais */}
    <section class="cont-destaquesema">
    <p class="item-destaquesema">Inserir Destaques Semanais</p>
    </section>

    {/* Botão de Explorar indo para os Posts */}
    <section class="cont-botexp">
    <button class="item-botexp" onClick={() => setContent('explorar')}>Explorar</button>
    </section>
    </>}
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

    
  )
}

export default App
