import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { getNewKey } from '../../helpers/Helper';


const ImgInput = (props) => {
    const { previewImg, onClickUpload, onDeleteImg } = props

    let renderImg = (
        <Form.Group
            /* key={inputFileKey}  */
            type={'file'}
            onChange={onClickUpload}
            controlId="formFile"
            className="mb-3">
            <Form.Control type="file" />
        </Form.Group>
    );
    if (previewImg) {
        renderImg = (
            <React.Fragment>
                <img alt="not found"
                    height={"125px"}
                    width={"125px"}
                    src={URL.createObjectURL(previewImg)} />
                <Button
                    variant='danger'
                    style={{ marginTop: '10px' }}
                    onClick={onDeleteImg}>
                    Eliminar imagen
                </Button>
            </React.Fragment>
        )
    }
    return renderImg
}

export default ImgInput