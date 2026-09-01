function Sobre() {
    const [bumps, setBumps] = React.useState(0);

    function darBump() {
        setBumps(bumps + 1);
    }

    return (
        <main className="conteudo-sobre">
            <div className="card-sobre">
                <h2>Sobre o Paletta</h2>
                <p>
                    O Paletta é um site em desenvolvimento que tem como objetivo intermediar
                a conexção de artistas com clientes, o diferencial de mercado do paletta
                é a forma de como é feita essas conexções, usamos de uma logica inversa, 
                que consiste na inversão da direção da comunicação em um ciclo normal
                um cliente se interessaria em um artista e sua arte e logo entraria em contanto
                ai que entra a inversão de logica, uma vez que um artista entra na nossa Plataforma
                ele podera navegar pela aba de explorar e la ele encontra postagens feitas por
                usuarios que tem interesse em arte, nessas postagens haveram especificações
                e requirimentos do que o cliente precisa uma vez que o artista acha um post que o
                agrada ele clica em aceitar e começa a comunicação entre ele e o Cliente.
                </p>

                <div className="secao-bump">
                    <button className="btn-bump" onClick={darBump}>
                        Bump!
                    </button>
                    <p className="contador-bump">
                        Contador de Bumps: <strong>{bumps}</strong>
                    </p>
                </div>
            </div>
        </main>
    );
}

const conteudo = ReactDOM.createRoot(document.getElementById('conteudo'));
conteudo.render(<Sobre />);