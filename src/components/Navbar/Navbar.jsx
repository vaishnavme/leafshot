import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Navbar.module.css"

export const Navbar = () => {
    const { user, logOutUser } = useAuth();
    const [isNavActive, setNavActive] = useState(false);

    const navLinkVisible = () => setNavActive(prevState => !prevState)

    const activeStyle = {
        color: "#22C55E"
    }
    return (
        <Fragment>
            <nav className={`${styles.navbar}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.brand}`}>
                        <Link to="/">GreenFlix</Link>
                    </div>

                    <div className={`${styles.navContainer} ${isNavActive && styles.navActive}`}>
                        <ul className={`${styles.navItems}`}>
                            <li className={`${styles.navLink}`}>
                                <NavLink to="/" activeStyle={activeStyle} end>Home</NavLink>
                            </li>
                            <li className={`${styles.navLink}`}>
                                <NavLink to="/playlist" activeStyle={activeStyle}>Playlists</NavLink>
                            </li>
                            { user ?
                            <li className={`${styles.navLink}`}>
                                <NavLink to="/account" activeStyle={activeStyle}>Account</NavLink>
                            </li>
                            :
                            <li className={`${styles.navLink}`}>
                                <NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>
                            </li>

                            }
                            <li className={`${styles.navLink}`}>
                                <NavLink to="/account" activeStyle={activeStyle}>Account</NavLink>
                            </li>
                            {
                                user && 
                                <button onClick={() => logOutUser()}>Logout</button>
                            }
                        </ul>
                    </div>

                    <button 
                        onClick={() => navLinkVisible()}
                        className={`${styles.btnIcon}`}>
                        <i className="bx bx-menu"></i>
                    </button>
                </div>
            </nav>
        </Fragment>
    )
}