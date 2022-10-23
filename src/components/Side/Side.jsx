import React from "react";
import styles from "./Side.module.css";

const Side = ({userRoomList}) => {

    //debugger;
    
    return(
        <aside>
            {
                userRoomList.current.map((obj, index)=>{
                    return (
                        <div key={index} className={styles.div_aside}>
                            <img className={styles.img_profile} src={obj.img} alt=""/>
                            <b className={styles.b_userName} >{obj.name}</b>
                            <small className={styles.small_date} >{obj.date}</small>
                            <p className={styles.p_title_contents} >{obj.titleContents}</p>
                        </div>
                    )
                })
            }
        </aside>
    )
}

export default Side;