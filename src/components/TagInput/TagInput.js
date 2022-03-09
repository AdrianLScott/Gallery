import React, { useEffect, useRef, useState } from 'react'
import Tag from '../Tag/Tag'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './TagInput.css'
import { getNewKey } from '../../helpers/Helper'
import TagList from '../TagList/TagList'
const TagInput = props => {

    const { value, onChange, onKeyPress } = props



    return (
        <React.Fragment>
            <div className='input-container'>
                <label>Ingresa los tags de la imagen: </label>
                <InputGroup className="mb-3">
                    <FormControl
                        value={value}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </InputGroup>

            </div>
        </React.Fragment>
    )
}

export default TagInput;