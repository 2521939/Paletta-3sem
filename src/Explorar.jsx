import React from "react";
import './App.css'
import './Explorar.css'
import { useState, useRef, useEffect, useCallback } from 'react'
import './Criar.css'
import api from "./api";

const FORMULARIO_VAZIO = { titulo: '', descricao: '', contato: '', };

function mensagemDeErro(error, mensagemPadrao) {
  if (!error.response) {
    return 'Não foi possível conectar ao servidor.';
  }
  const status = error.response.status;
  if (status === 401 || status === 403) {
    return 'Acesso negado: verifique a chave da API.';
  }
  if (status === 429) {
    return 'Muitas requisições. Aguarde um instante e tente novamente.';
  }
  return mensagemPadrao;
}




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


    const [pedidos, setPedidos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [formulario, setFormulario] = useState(FORMULARIO_VAZIO);
    const [erro, setErro] = useState('');

    const editando = editandoId !== null;

// READ - Verificar se consigo conectar realmente ou se precisa abri o ip
  const carregarPedidos = useCallback(async () => {
    setCarregando(true);
    try {
      const resposta = await api.get('/pedidos');
      console.log("Olha o que veio da api:", resposta.data);
      // Se não houver usuários, o back-end pode devolver null
      setPedidos(resposta.data ?? []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setErro(mensagemDeErro(error, 'Erro ao buscar usuários.'));
    } finally {
      setCarregando(false);
    }
  }, []);


useEffect(() => { // Erros Aqui Verificar Remover
    carregarPedidos();
  }, [carregarPedidos]);

function alterarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
}
// Create - Testar se campos são criados corretamente
async function salvarPedido(evento) {
    evento.preventDefault();
    setErro('');

    const dados = {
      titulo: formulario.titulo.trim(),
      descricao: formulario.descricao.trim(),
      contato: formulario.contato.trim(),
    };

    try {
      if (editando) {
        await api.put(`/pedidos/${editandoId}`, dados);
      } else {
        await api.post('/pedidos', dados);
      }
      limparFormulario();
      fecharModal();
      await carregarPedidos();
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      setErro(mensagemDeErro(error, 'Erro ao salvar pedido.'));
    }
  }

  // Parte que vai guardas dados e usar na URL pro PUT (Tenho q verificar se a logica faz sentido pro back)
  function editarUsuario(pedido) {
    fecharPost();
    abrirModal();
    setFormulario({ titulo: pedido.titulo, descricao: pedido.descricao, contato: pedido.contato });
    setEditandoId(pedido._id);
    setErro('');
}

// Deletar
 async function excluirPedido(pedido) {
    if (!window.confirm(`Excluir o post "${atualPost.titulo}"?`)) return;
    setErro('');

    try {
      await api.delete(`/pedidos/${atualPost._id}`);
      // Só limpa o formulário se o usuário excluído estava em edição
      if (atualPost._id === editandoId) limparFormulario();
      fecharModal();
      await carregarPedidos();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      setErro(mensagemDeErro(error, 'Erro ao excluir pedido.'));
    }
  }

  // Volta o formulário ao estado inicial (modo de cadastro)
  function limparFormulario() {
    setFormulario(FORMULARIO_VAZIO);
    setEditandoId(null);
  }

    return (
        <>
        <button class="botao-novo-post icone-novo-post" onClick={abrirModal}>+</button>

    {/*Campo de Criação de post (Modal)*/}
    <dialog ref={dialogRef} className="centralizando-dialog">
    <form onSubmit={salvarPedido}>
    <section class="container-criacao">
      <section>
        <section class="header-criar">
         <button class="voltar" type="button" onClick={fecharModal}>X</button> 
        <h1 class="titulo-criar">{editando ? 'Edite seu Post!' : 'Crie seu Post!'}</h1>
        </section>
        <section class="criacao-dentro">
        <h2 class="titulos-campos">Titulo do seu Post:</h2>
        
        <label>Titulo:{' '}
        <input class="circularinput" type="text" name="titulo" value={formulario.titulo} onChange={alterarCampo} minLength={4} required maxLength={100} placeholder="Escreva sobre o que se trata"/>
        </label>

        <h2 class="titulos-campos">Descrição:</h2>
        <section>
        
        <label>Descrição:
        <input class="circularinput" type="text" name="descricao" value={formulario.descricao} onChange={alterarCampo} maxLength={255} required placeholder="De uma descrição para seu post!"/>
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
        <label>Meio de Comunicação:
        <input class="circularinput" type="text" name="contato" value={formulario.contato} onChange={alterarCampo} placeholder="Insira seu meio de comunicação"/>
        </label>
        </section>

{/*         <label for="idPos">Id para testes
        <input class="circularinput" type="text" name="idPos" id="idPos"/>
        </label> */}

        <button class="button-criar" id="criarpostbtn" type="submit">{editando ? 'Salvar alterações' : 'Criar'}</button>{' '}
        <div>{editando == false ? (<><button type="button" class="deletar" onClick={limparFormulario}>Limpar</button></>) : (<><button type="button" class="deletar" onClick={() => excluirPedido(editandoId)}>Deletar</button></>)}</div>
        </section>
        </section>
     </section>
    </form>
    </dialog>


    <section class="container-posts">
    {pedidos.map((pedido) => (
    <div key={pedido._id} class="post-thumb" onClick={() => abrirPost(pedido)}>
    <h3>{pedido.titulo}</h3>
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
            <p id="comuniOutros">Contato: {atualPost.contato}</p>
        </section>

        <section class="botoes-crud">
            <button class="atualizar" onClick={() => editarUsuario(atualPost)}>Atualizar</button>
        </section>

    </section>
    </>)}
    </dialog>

        </>
    )
};

export default Explorar