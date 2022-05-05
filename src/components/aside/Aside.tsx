import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
    return (
        <>
        <h1>Aside Navigation</h1>
        <Link className="welcome-link" to={'/'}>
          Welcome
        </Link>
        <Link className="main-link" to={'/main'}>
          Main
        </Link>
        </>
    )
}

export default Aside;
