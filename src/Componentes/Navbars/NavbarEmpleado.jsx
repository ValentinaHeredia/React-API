import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavbarEmpleado = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="nav">
            <ul className="navList">
                {/* Enlaces principales */}
                <li className="navItem">
                    <Link to="/empleados/edificios" className="link">Edificios</Link>
                </li>
                <li className="navItem">
                    <Link to="/empleados/unidades" className="link">Unidades</Link>
                </li>
                <li className="navItem">
                    <Link to="/empleados/reclamos" className="link">Reclamos</Link>
                </li>

                {/* Dropdown de Personas */}
                <li className="navItem">
                    <button onClick={toggleDropdown} className="drop-downButton">
                        Personas ↓
                    </button>
                    {showDropdown && (
                        <ul className="drop-downMenu">
                            <li className="drop-downItem">
                                <Link to="/empleados/personas/usuarios" className="link">Usuarios</Link>
                            </li>
                            <li className="drop-downItem">
                                <Link to="/empleados/personas/empleados" className="link">Empleados</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default NavbarEmpleado;
