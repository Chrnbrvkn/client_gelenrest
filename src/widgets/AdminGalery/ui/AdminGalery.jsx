import { useAdminImages } from "../lib/useAdminImages";
import { DndContext } from "@dnd-kit/core";
import { fetchHousesAsync } from "../../../store/features/lists/houses/housesFetch";
import { DraggableImage } from "./DraggableImage";
import { DroppableImage } from "./DroppableImage";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeImagesOrder } from "../../../api/changeImagesOrder";
export const AdminGalery = ({ item, type }) => {
  const dispatch  =  useDispatch();
  const images = useSelector(
    (state) =>
      state[`${type}s`].data.find((i) => i.id === item.id)?.images || []
  );

  const { handleDeleteImage } = useAdminImages(item, type);

  const [draggedId, setDraggedId] = useState(null);
  const [overId, setOverId] = useState(null);

  const [dndImages, setDndImages] = useState(images);

  useEffect(() => {
    setDndImages(images);
  }, [images]);

  function swapImages(draggedId, overId) {
    setDndImages((prevImages) => {
      const indexA = prevImages.findIndex((image) => image.id === draggedId);
      const indexB = prevImages.findIndex((image) => image.id === overId);
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

  function handleDragEnd() {
    if (draggedId && overId) {
      swapImages(draggedId, overId);
    }
    setDraggedId(null);
    setOverId(null);
  }

  const handleSaveOrder = async (images, itemId, type) => {
    const newOrder = images.map((image, i) => ({ id: image.id, position: i }));
    await changeImagesOrder(newOrder, itemId, type);
    dispatch(fetchHousesAsync());
  };
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
      <button onClick={() => handleSaveOrder(dndImages, item.id, type)}>
        Сохранить расположение фотографий
      </button>
    </DndContext>
  );
};
