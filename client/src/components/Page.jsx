import { NavLink, Outlet, useNavigate } from "react-router-dom"

export function Page(){

    let navigate = useNavigate();

    function handleLogoClick(){
        navigate("/");
    }

    return(
        <div id="page">
            <header id="main-header">
                <img
                    src={process.env.PUBLIC_URL + '/images/logo.png'}
                    alt="logo"
                    id="logo"
                    title="Main page"
                    onClick={handleLogoClick}
                />
                <div className="navlink" >
                    <NavLink to="/" tabIndex="0">Predict</NavLink>
                    <NavLink to="/predictions" tabIndex="0">Result table</NavLink>
                    <NavLink to="/about" tabIndex="0">About</NavLink>
                </div>
            </header>
            <article id="main-content">
                <p className="disclaimer">Ceci est une version "statique" de la plateforme dans un but de démonstration de l'interface uniquement, la réelle application coûtant trop cher à héberger dû à la puissance de calcul requise par l'intelligence artificielle.</p>
                <Outlet/>
            </article>
            
        </div>
    )
}

