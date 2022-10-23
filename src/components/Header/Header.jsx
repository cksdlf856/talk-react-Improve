import React from "react";
import styles from "./Header.module.css";

const Header = () => {

    const header_menu_toggle = () => {

    }


    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <div>
                    <i className="fa-solid fa-bars" onClick={header_menu_toggle}></i>
                </div>
                <div className={styles.header_div_right}>
                    <input className={styles.ip_search} placeholder="user search"></input>
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                    <i className="fa-solid fa-bell" style={{"marginLeft":"20px"}}></i>
                </div>

            </nav>
        </header >
    )
}

export default Header;