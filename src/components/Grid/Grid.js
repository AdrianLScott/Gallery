import React from 'react'
import './Grid.css'
const Grid = props => {

    return (
        <div className='grid-container' >
            {
                props.data.map(item =>
                    <div onClick={props.onPressGridItem.bind(this, item.id)} className='grid-item' key={item.id}>
                        <img alt="not found"
                            className='img-style'
                            src={URL.createObjectURL(item.img)} />
                    </div>
                )
            }
        </div>
    )
}

export default Grid