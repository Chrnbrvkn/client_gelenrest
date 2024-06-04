import React from 'react';
import {useDroppable} from '@dnd-kit/core';


export function DroppableImage({ id, children }) {
  const {isOver, setNodeRef} = useDroppable({ id: id });
  const style = {
    outline: isOver ? '2px solid green' : 'none',
    padding: '10px',
    margin: '5px',
  };

  return (
    <div ref={setNodeRef} style={style} >
      {children}
    </div>
  );
}
