import { useAdminImages } from "../lib/useAdminImages";
import { DndContext } from "@dnd-kit/core";

import { DraggableImage } from "./DraggableImage";
import { DroppableImage } from "./DroppableImage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AdminGalery = ({ images, item, type }) => {
  const { handleDeleteImage } = useAdminImages(item, type);

  const [draggedId, setDraggedId] = useState(null);
  const [overId, setOverId] = useState(null);

  const [dndImages, setDndImages] = useState(images);

  
  function swapImages(draggedId, overId) {
    setDndImages((prevImages) => {
      const indexA = prevImages.findIndex(image => image.id === draggedId);
      const indexB = prevImages.findIndex(image => image.id === overId);
      let newImages = [...prevImages];
      [newImages[indexA], newImages[indexB]] = [
        newImages[indexB],
        newImages[indexA],
      ];
      return newImages;
    });
  }
  function handleDragStart(event) {
    const { active } = event;
    setDraggedId(active.id);
  }

  function handleDragOver(event) {
    const { over } = event;
    setOverId(over ? over.id : null);
  }

  function handleDragEnd(event) {
    if (draggedId && overId) {
      // Логика для замены изображений
      swapImages(draggedId, overId);
    }
    // Сброс состояний
    setDraggedId(null);
    setOverId(null);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="edit__image-list">
        {dndImages.length > 0 ? (
          dndImages.map((picture) => (
            <div key={picture.id}>
              <DroppableImage id={picture.id}>
                <DraggableImage key={picture.id} id={picture.id}>
                  <img
                    className="edit__image"
                    src={`https://api.gelenrest.ru${picture.url}`}
                    alt="Apart"
                  />
                </DraggableImage>
              </DroppableImage>
              <button
                className="houses__list-delete"
                onClick={() => handleDeleteImage(picture.id)}
              >
                Удалить
              </button>
            </div>
          ))
        ) : (
          <p>Нет фотографий</p>
        )}
      </div>
    </DndContext>
  );
};
