function Footer() {
    return (
        <footer className="rodape">
            <p className="copyright">© 2026 Paletta. Todos os direitos reservados.</p>
            <nav className="menu-auth">
                <a href="sobre.html">Sobre</a>
                <a href="">Contato</a>
            </nav>
        </footer>
    );
}

const footer = ReactDOM.createRoot(document.getElementById('footer'));
footer.render(<Footer />);

/*
menu-auth ele aproveita do css do cabeçalho
*/