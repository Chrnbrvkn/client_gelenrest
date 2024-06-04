
import styles from "./ImageUpload.module.css";
import { useImageUpload } from "../lib/useImageUpload";

export const ImageUpload = ({ id, type }) => {

  const {
    handleImageInput,
    handleImageChange,
    handleReset,
    handleUploadImages,
    pictures,
    inputRef,
  } = useImageUpload(id, type);

  return (
    <div className="photo windows__update-list--point button">
      <p>Добавьте фотографии</p>
      <button
        onClick={handleImageInput}
        className={styles.uploadButton}
        type="button"
        aria-controls="fileInput"
      >
        {pictures.length > 0 ? `Выбрано ${pictures.length} фотографий.` : "+"}
      </button>
      {pictures.length > 0 && (
        <button onClick={handleReset} className={styles.resetButton}>
          Сбросить
        </button>
      )}
      <input
        ref={inputRef}
        onChange={handleImageChange}
        className={styles.hiddenInput}
        type="file"
        accept="image/*"
        name={type}
        multiple
        aria-hidden="true"
      />
      <button
        type="button"
        className={`${styles.buttonUpload} ${
          pictures.length > 0 ? "active" : ""
        }`}
        disabled={!pictures.length}
        onClick={handleUploadImages}
      >
        Загрузить картинки
      </button>
    </div>
  );
};
