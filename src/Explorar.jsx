import React from "react";
import './App.css'
import './Explorar.css'
import { useState } from 'react'
import { useRef } from 'react';
import './Criar.css'
import { useLocalStorage } from "./useLocalStorage";

function Explorar(){

    const [atualPost, setAtualPost] = useState(null);

    const dialogRef = useRef(null);
    
    const abrirModal = () => {
        dialogRef.current.showModal();
        };
    
    const fecharModal = () => {
        dialogRef.current.close();
        };

    const dialogpost = useRef(null);

    const abrirPost = (post) => {
        setAtualPost(post);
        dialogpost.current.showModal();
        };
    
    const fecharPost = () => {
        dialogpost.current.close();
        };


    const [posts, setPosts] = useLocalStorage("posts", []);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [comunicacao, setComunicacao] = useState("");

function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setComunicacao("");
    setEditandoId(null);
    fecharModal();
    fecharPost();
}


function salvarPost(evento) {
    evento.preventDefault();

    const tituloLimpo = titulo.trim();
    const descricaoLimpo = descricao.trim();
    const comunicacaoLimpo = comunicacao.trim();

    if (!tituloLimpo || !descricaoLimpo) return;

    if (editandoId == null) {
      const novo = {
        id: crypto.randomUUID(),
        titulo: tituloLimpo,
        descricao: descricaoLimpo,
        comunicacao: comunicacaoLimpo,
      };
      setPosts((anteriores) => [...anteriores, novo]);
    } else {
      setPosts(anteriores =>
        anteriores.map(u =>
          u.id == editandoId ? { ...u, titulo: tituloLimpo, descricao: descricaoLimpo, comunicacao: comunicacaoLimpo, } : u
        )
      );
    }
    limparFormulario();
  }

    function Editar(atualPost) {
    setEditandoId(atualPost.id);
    setTitulo(atualPost.titulo);
    setDescricao(atualPost.descricao);
    setComunicacao(atualPost.comunicacao);
    fecharPost();
    abrirModal();
  };


  function removerPost(id) {
    setPosts(anteriores => anteriores.filter(u => u.id !== id));
    if (id === editandoId) limparFormulario();
  }

    return (
        <>
        <button class="botao-novo-post icone-novo-post" onClick={abrirModal}>+</button>

    {/*Campo de Criação de post (Modal)*/}
    <dialog ref={dialogRef} className="centralizando-dialog">
    <form onSubmit={salvarPost}>
    <section class="container-criacao">
      <section>
         <section class="header-criar">
         <button class="voltar" onClick={fecharModal}>X</button> 
        <h1 class="titulo-criar">Crie seu post!</h1>
      </section>
        <section class="criacao-dentro">
        <h2 class="titulos-campos">Titulo do seu Post:</h2>
        
        <label for="titulo">Titulo:
        <input class="circularinput" type="text" id="titulo" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Escreva sobre o que se trata"/>
        </label>

        <h2 class="titulos-campos">Descrição:</h2>
        <section>
        
        <label required minlength="20" maxlenght="250" for="descricao">Descrição:
        <input class="circularinput" type="text" id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="De uma descrição para seu post!"/>
        </label>
        </section>

        {/*
        <h2 class="titulos-campos">Especificações:</h2>
        
     
        <section>
        <label for="resolucao">Tamanho:
        <select name="resolucao" id="resolucao">
        <option value="3840x2160">Computador/Monitor (3840 x 2160)</option>
        <option value="2560x1440">Computador/Monitor (2560 x 1440)</option>
        <option value="1920x1080">Computador/Monitor (1920 x 1080)</option>
        <option value="1366x720">Computador/Monitor (1366 x 720)</option>
        <option value="1440x3200">SmartPhone (1440 x 3200)</option>
        <option value="1170x2532">SmartPhone (1170 x 2532)</option>
        <option value="1080x2400">SmartPhone (1080 x 2400)</option>
        <option value="720x1600">SmartPhone (720 x 1600)</option>
        <option value="resOutro">Outro (Detalhar na Descrição)</option>
        </select>
        </label>
        </section> */}

        <h2 class="titulos-campos">Informações de Contato:</h2>

        <section>
        <label for="comuniOutros">Meio de Comunicação:
        <input class="circularinput" type="text" id="comuniOutros" name="comuniOutros" value={comunicacao} onChange={(e) => setComunicacao(e.target.value)} placeholder="Insira seu meio de comunicação"/>
        </label>
        </section>

{/*         <label for="idPos">Id para testes
        <input class="circularinput" type="text" name="idPos" id="idPos"/>
        </label> */}

        <button class="button-criar" id="criarpostbtn" type="submit">{editandoId == null ? 'Cadastrar' : 'Alterar'}</button>
        <div>{editandoId == null ? '' : (<><button type="button" class="deletar" onClick={() => removerPost(editandoId)}>Deletar</button></>)}</div>
        </section>
        </section>
     </section>
    </form>
    </dialog>


    <section>
    {posts.map((post) => (
    <div key={post.id} class="post-thumb" onClick={() => abrirPost(post)}>
    <h3>{post.titulo}</h3>
    </div>
    ))}
    </section>

    <dialog ref={dialogpost} class="modal-de-post">
    {atualPost && (<>
    <section class="header-post">
        <h1>{atualPost.titulo}</h1>
        <button id="fecharbtnpost" class="fecharbtn" onClick={fecharPost}>X</button>
    </section>

    <section class="campos">
        <section class="campo-descricao">
            <h2>Descrição:</h2>
            <p id="descricao">Descrição: {atualPost.descricao}</p>
        </section>  

{/*         <section class="campo-especificacao">
            <h2>Especificações:</h2>
            <p id="tamanho">Tamanho: </p>
        </section> */}

        <section class="campo-contato">
            <h2>Informações de Contato:</h2>
            <p id="comuniOutros">Contato: {atualPost.comunicacao}</p>
        </section>

        <section class="botoes-crud">
            <button class="atualizar" onClick={() => Editar(atualPost)}>Atualizar</button>
        </section>

    </section>
    </>)}
    </dialog>

        </>
    )
};

export default Explorar