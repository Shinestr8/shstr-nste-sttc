import { NavLink, Outlet } from "react-router-dom"
// import { Predict } from "./Predict"

export function Page(){
    return(
        <div id="page">
            <header id="main-header">
                <img
                    src={process.env.PUBLIC_URL + '/images/logo.png'}
                    alt="logo"
                    id="logo"
                />
                <div className="navlink" >
                    <NavLink to="/">Predict</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </header>
            <article id="main-content">
                <Outlet/>
            </article>
      </div>        
    )
}

