import cookie from 'react-cookies'
import { Outlet, Link } from "react-router-dom";
import { useEffect } from 'react';

export default function Nav() {
    useEffect(() => {
        if (cookie.load("role") == "user") {
            document.getElementById("link2").className = "nav-link visually-hidden"
        }
    }, []);
    function logout() {
                cookie.remove('rtt')
                cookie.remove('rttp')
                cookie.remove('_id')
                cookie.remove('name')
                cookie.remove('cp')
                cookie.remove('role')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">GDA</a>
                    <button
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#main-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="main-nav" className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page" >Accueil</Link>
                            </li> */}
                            <li className="nav-item ">
                                <Link to="/gda" className="nav-link active" aria-current="page" >Gestion des abscences</Link>
                            </li>
                            <li className="nav-item" >
                                <Link to="/JF" className="nav-link active" aria-current="page" >Jours Ferié</Link>
                            </li >
                            <li className="nav-item" id='link2'>
                                <Link to="/validation" className="nav-link active" aria-current="page" >Validation des demandes</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='mx-3'>
                        <span>
                            Bonjour {cookie.load("name")}
                        </span>
                    </div>
                    <div>
                        <span>
                            <a href="/" onClick={()=>{logout()}}>Se Déconnecter</a>
                        </span>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}