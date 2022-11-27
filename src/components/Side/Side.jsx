import React from "react";
import styles from "./Side.module.css";

const Side = ({ userRooms, sideListOnClick, asideRef, roomListRef }) => {
    
    const onClick = (e) => {
        
        if ( '' !== e.currentTarget.style.backgroundColor ) return;      
        
        sideListOnClick(userRooms[Number(e.currentTarget.id)], e.currentTarget);
    }
    
    return(
        <>  
            <aside id="aside_list" className={styles.aside_list} ref={asideRef} >
                {
                    userRooms.map((obj, index)=>{
                        return (
                            <div key={index} className={styles.div_aside} onClick={onClick} id={index} ref={(ref) => {roomListRef.current[index] = ref}} >
                                <img className={styles.img_profile} src={obj.img} alt=""/>
                                <b className={styles.b_userName} >{obj.name}</b>
                                <small className={styles.small_date} >{obj.date}</small>
                                <p className={styles.p_title_contents} >{obj.titleContents}</p>
                            </div>
                        )
                    })
                }
            </aside>
        </>
    )
}

export default Side;