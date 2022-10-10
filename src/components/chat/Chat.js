import React from "react";
import styles from "./Chat.module.css";

const Chat = () => {

    const main_border_css = {
        border: "1px black solid",
        width: "70%"
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

    const textarea_css = {
        width: "95.5%",
        height: "70px",
        resize: "none",
        padding: "20px"
    }

    const [test, setTest] = React.useState(0);

    const onKeyDown = (e) => {

        if ( "Enter" === e.key ){
            setTest(e.target.value);
            
            e.target.value = "";
        }

    }

    const list = [
        "asd", "qwe", "ert"
    ];

    

    return(
        <main style={main_border_css} >
            <header style={header_css}>
                <h2 className={styles.test}>방 title</h2>
            </header>
            <main style={main_css}>
                {/* <SelfChat msg={test} /> */}
                <OpponentChat />
                <OpponentChat />
                <OpponentChat />
                <OpponentChat />
                {
                    list.map( msg => 
                        <SelfChat msg={msg} />
                    )
                }
            </main>
            <footer style={footer_css}>
                <textarea style={textarea_css} onKeyDown={onKeyDown}></textarea>
            </footer>
        </main>
    )
}

const SelfChat = ({msg}) => {

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
                {msg}
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