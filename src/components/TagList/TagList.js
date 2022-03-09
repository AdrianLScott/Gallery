import React from 'react'
import Tag from '../Tag/Tag'

const TagList = (props) => {

    const { tagsArray, onDeleteTag, onClickTag } = props
    return (
        <div className='tagList'>
            {
                tagsArray?.map((item) =>
                    <Tag key={item.id}
                        onDeleteTag={onDeleteTag.bind(this, item.id)}
                        onClick={onClickTag.bind(this, item)}
                    >
                        {item.value}
                    </Tag>)
            }
        </div>
    )
}

export default TagList