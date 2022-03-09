import React from "react";
import './Tag.css'
const Tag = props => {
    return (
        <div className="tag">
            <div onClick={props.onClick}  >
                {props.children}
            </div>
            <button onClick={props.onDeleteTag} >x</button>

        </div>

    )
}
export default Tag