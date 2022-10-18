import React from "react";
import styles from "./Header.module.css";

const Header = () => {

    const header_menu_toggle = () => {

    }


    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <div className={styles.hedader_nav_item_left} >
                    <i className="fa-solid fa-bars" onClick={header_menu_toggle}></i>
                </div>
                <div className={styles.header_nav_item_right}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <i className="fa-solid fa-bell"></i>
                </div>

            </nav>
        </header >
    )
}

export default Header;