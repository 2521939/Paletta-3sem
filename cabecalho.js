function Cabecalho() {
    return (
        <header className="cabecalho">
            <h1 className="logo">
                <a href="index.html">Paletta</a>
            </h1>
            <nav className="menu-auth">
                <a href="#login">Login</a>
                <a href="#register">Register</a>
            </nav>
        </header>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Cabecalho />);