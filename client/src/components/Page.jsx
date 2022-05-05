import { NavLink, Outlet } from "react-router-dom"
// import { Predict } from "./Predict"
import { useNavigate } from "react-router-dom"

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
                    <NavLink to="/about" tabIndex="0">About</NavLink>
                </div>
            </header>
            <article id="main-content">
                <Outlet/>
            </article>
            
        </div>
    )
}

