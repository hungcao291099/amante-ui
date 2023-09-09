import React from 'react'
import parse from 'html-react-parser';

import { useConceptRoomContext } from '@contexts/ConceptRoomContext'

const TextEditor = () => {
  const { room } = useConceptRoomContext()
  return (
    <section className='text-edit'>
      <div>{room.editor? parse(room.editor): null}</div>
      <div className='content-line'></div>
    </section>
  )
}

export default TextEditor