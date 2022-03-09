import React, { useRef, useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from './components/Grid/Grid';
import TagInput from './components/TagInput/TagInput';
import Button from 'react-bootstrap/Button';

import './App.css'
import ImgInput from './components/ImgInput/ImgInput';
import { getNewKey } from './helpers/Helper';
import TagList from './components/TagList/TagList';

const initialCurItemState = { img: undefined, tags: [], id: '' }
function App() {

  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState(initialCurItemState)
  const [inputValue, setInputValue] = useState('')



  const curItemEditingIndex = useRef(undefined)
  const curTagEditingId = useRef(undefined)


  const onSaveItemHandler = () => {
    const indexItemEditing = curItemEditingIndex.current

    if (!isNaN(indexItemEditing)) {
      const updatedItems = [...items]
      updatedItems[indexItemEditing] = { ...currentItem }
      setItems([...updatedItems])
      setCurrentItem({ ...initialCurItemState })
      curItemEditingIndex.current = undefined
      return;
    }

    const newItem = { ...currentItem, id: getNewKey() }
    setCurrentItem({ img: undefined, tags: [], id: '' })
    setItems(curItems => [...curItems, newItem])
  }

  const onPressGridItemHandler = (id) => {
    curItemEditingIndex.current = items.findIndex(i => i.id === id)
    setCurrentItem({
      img: items[curItemEditingIndex.current].img,
      tags: items[curItemEditingIndex.current].tags,
      id: items[curItemEditingIndex.current].id
    })

  }
  const onAddTagHandler = (e) => {

    const value = e.key
    if (!((value === 'Enter' || value === ',') && inputValue.length > 0))
      return

    if (curTagEditingId.current) {
      onEditTagHandler()
      return;
    }


    if (currentItem.tags.length < 3 && !curTagEditingId.current) {
      const copyCurItem = { ...currentItem }
      copyCurItem.tags.push({ id: getNewKey(), value: inputValue })
      setCurrentItem({ ...copyCurItem })
      setInputValue('')

    }


  }

  const onEditTagHandler = () => {

    const editedTag = { id: curTagEditingId.current, value: inputValue }
    const copyCurItem = { ...currentItem }
    const indexToEdit = copyCurItem.tags.findIndex(i => i.id === curTagEditingId.current)
    copyCurItem.tags[indexToEdit] = editedTag
    setCurrentItem({ ...copyCurItem })
    setInputValue('')
    curTagEditingId.current = undefined

  }

  const onDeleteTagHandler = id => {
    setInputValue('')
    curTagEditingId.current = id
    const filteredTags = currentItem.tags.filter(curTag => curTag.id !== id)
    const copyCurItem = { ...currentItem }
    copyCurItem.tags = [...filteredTags]
    setCurrentItem({ ...copyCurItem })
  }

  const onClickTagHandler = (item) => {
    setInputValue(item.value)
    curTagEditingId.current = item.id

  }
  const onClickUploadHandler = event => {
    if (event.target.files && event.target.files[0]) {
      const copyCurItem = { ...currentItem }
      copyCurItem.img = event.target.files[0]
      setCurrentItem({ ...copyCurItem })
    }
  };

  const onDeleteImgHandler = () => {
    const copyCurItem = { ...currentItem }
    copyCurItem.img = undefined
    setCurrentItem({ ...copyCurItem })
  }


  return (
    <div className="inputContainer">
      {console.log(currentItem)}

      <h1>Gallery grid</h1>
      <ImgInput
        onDeleteImg={onDeleteImgHandler}
        onClickUpload={onClickUploadHandler}
        previewImg={currentItem.img}
      />
      <TagInput
        value={inputValue}
        onChange={e => setInputValue(e.target.value.replace(/[,]/g, ''))}
        onKeyPress={onAddTagHandler}
      />
      <TagList
        tagsArray={currentItem.tags}
        onDeleteTag={onDeleteTagHandler}
        onClickTag={onClickTagHandler}
      />

      <Button
        variant='success'
        disabled={!currentItem.img || currentItem.tags?.length < 1}
        onClick={onSaveItemHandler}>
        Guardar
      </Button>
      {items.length > 0 && <Grid onPressGridItem={onPressGridItemHandler} data={items} />}

    </div>

  );
}

export default App;
