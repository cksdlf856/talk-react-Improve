import React from "react";
import styles from "./Chat.module.css";

const Chat = () => {

    const main_border_css = {
        border: "1px black solid"
    }

    const header_css = {
        display: "flex",
        flexDirection: "revert",
        padding: "10px",
        border: "1px #c9c9c9 solid"
    }

    const footer_css = {
        padding: "10px"
    }

    const main_css = {
        padding: "10px"
    }

    return(
        <main style={main_border_css} >
            <header style={header_css}>
                <h2 className={styles.test}>방 title</h2>
            </header>
            <main style={main_css}>
                <SelfChat />
                <OpponentChat />
                <OpponentChat />
                <OpponentChat />
                <OpponentChat />
            </main>
            <footer style={footer_css}>
                <textarea></textarea>
            </footer>
        </main>
    )
}

const SelfChat = () => {

    const div_css = {
        display: "flex",
        justifyContent: "end"
    }

    const p_date_css = {
        marginRight: "20px",
        marginTop: "42px"
    }

    const p_contents_css = {
        marginRight: "20px",
        border: "1px black solid",
        borderRadius: "7px",
        padding: "12px"
    }

    return(
        <div style={div_css}>
            <p style={p_date_css}>
                오후 4:04
            </p>
            <p style={p_contents_css}>
                Nice guy~~
            </p>
        </div>
    )
}

const OpponentChat = () => {

    const div_css = {
        display: "flex"
    }

    const p_contents_css = {
        marginLeft: "20px",
        border: "1px black solid",
        borderRadius: "7px",
        padding: "12px"
    }

    const p_date_css = {
        marginLeft: "20px",
        marginTop: "42px"
    }

    return(
        <div style={div_css}>
            <img className={styles.img_profile} src="./img/img_profile.png" alt=""/>
            <p style={p_contents_css}>
                Nice guy~~
            </p>
            <p style={p_date_css}>
                오후 5:22
            </p>
        </div>
    )
}


export default Chat;