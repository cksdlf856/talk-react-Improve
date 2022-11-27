import React from "react";
import styles from "./Chat.module.css";

const Chat = ({ userMsgObj, chatOnKeyDown, chatMainRef, chatRef }) => {
    
    const inputRef = React.useRef();
    
    React.useEffect(()=>{
        const contentLength = (undefined === userMsgObj.msgList ? 0 : userMsgObj.msgList.length);

        if( 0 === contentLength ) return;

        //최신 채팅 업데이드 시 스크롤 하단으로 이동.
        const chatScroll = document.getElementById("main_div_chat");
        chatScroll.scrollTop = chatRef.current.scrollHeight;
        
    },[userMsgObj.msgList]); 

    const onKeyDown = (e) => {
        if ( "Enter" === e.key && "" !== e.target.value ){
            chatOnKeyDown(e.target.value);
            e.target.value = "";
        }
    }
    
    return(
        
        <main className={styles.main_border_css} ref={chatMainRef} >
            <header className={styles.header_css}>
                <h2 className={styles.header_title_css}> { undefined !== userMsgObj.userName ? userMsgObj.userName : ":D" } </h2>
            </header>
            <main id="main_div_chat" className={styles.main_css} ref={chatRef}>                
                {
                    undefined !== userMsgObj.msgList ? 
                    userMsgObj.msgList.map( (obj, index) => {
                        return <ChatListUi obj={obj} key={index} myEmail={userMsgObj.myEmail} contents={userMsgObj.msgList} />
                    })
                    :
                    null
                    
                }
            </main>
            <footer className={styles.footer_css}>
                <input className={styles.input_css} onKeyDown={onKeyDown} ref={inputRef} inputMode={"search"} maxLength="45"/>
            </footer>
        </main>
        
    )
}

const ChatListUi = ({obj, myEmail, contents}) => {
    
    return(

        <>
            { obj.date !== (contents[obj.order-2] === undefined ? "" : contents[obj.order-2].date ) ? 
            <div className={styles.div_b_date}>
                <b className={styles.b_date} onMouseOver={(e)=>{ e.target.style.opacity = "1"; }} onMouseOut={(e)=>{ e.target.style.opacity = "0.5"; }} >
                    { obj.date }
                </b>
            </div>
            :
            ""
            }

            { myEmail === obj.email ?
            <div className={styles.div_css}>
                <p className={styles.p_date_css}>
                    {obj.time}
                </p>
                <p className={styles.p_contents_css}>
                    {obj.chat}
                </p>
            </div>
            :
            <div className={styles.div_css_op}>
                <img className={styles.img_profile} src="./img/img_profile.png" alt=""/>
                <p className={styles.p_contents_css_op}>
                    {obj.chat}
                </p>
                <p className={styles.p_date_css_op}>
                    {obj.time}
                </p>
            </div>
            }
        </>
        
    )
}

export default Chat;