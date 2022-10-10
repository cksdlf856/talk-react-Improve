import React from "react";

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
                <h2>방 title</h2>
            </header>
            <main style={main_css}>
                <Selfchat />
            </main>
            <footer style={footer_css}>
                <textarea></textarea>
            </footer>
        </main>
    )
}

const Selfchat = () => {

    const div_css = {
        display: "flex",
        justifyContent: "end"
    }

    const p_date_css = {
        marginRight: "20px"
    }

    return(
        <div style={div_css}>
            <p style={p_date_css}>
                오후 4:04
            </p>
            <p>
                Nice guy~~
            </p>
        </div>
    )
}



export default Chat;