import React from 'react';
import { useRef } from 'react';
import './Header.css';
import './App.css';
import './Login.css'

function Header() {
        const dialogRef = useRef(null);
    
        const abrirModal = () => {
            dialogRef.current.showModal();
        };
    
        const fecharModal = () => {
            dialogRef.current.close();
        };
    
  return (
    <>
     <header className="cont-cabecalho">
        <h1 className="item-cabecalho logo-cabecalho">Paletta</h1>
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


     
    </>
  );
}

export default Header;