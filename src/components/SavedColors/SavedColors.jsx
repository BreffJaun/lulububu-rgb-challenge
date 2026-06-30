import { useState } from "react";

import "./SavedColors.css";

const SavedColors = ({ colors, onDeleteColor, onSelectColor }) => {
  const [copiedValue, setCopiedValue] = useState(null);

  const toHex = (value) => {
    return Number(value).toString(16).padStart(2, "0").toUpperCase();
  };

  const handleCopy = async (type, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(type);

      setTimeout(() => {
        setCopiedValue(null);
      }, 1200);
    } catch (error) {
      console.error("Could not copy color value:", error);
    }
  };

  if (colors.length === 0) {
    return (
      <section className="saved-colors">
        <h2>Saved Colors</h2>
        <p className="saved-colors__empty">No saved colors yet.</p>
      </section>
    );
  }

  return (
    <section className="saved-colors">
      <h2>Saved Colors</h2>

      <ul className="saved-colors__list">
        {colors.map((color) => {
          const rgbValue = `rgb(${color.red_value}, ${color.green_value}, ${color.blue_value})`;
          const hexValue = `#${toHex(color.red_value)}${toHex(
            color.green_value,
          )}${toHex(color.blue_value)}`;

          return (
            <li className="saved-colors__item" key={color.id}>
              <button
                className="saved-colors__delete-button"
                type="button"
                onClick={() => onDeleteColor(color.id)}
                aria-label={`Delete ${color.name}`}
              >
                🗑
              </button>

              <button
                className="saved-colors__select-button"
                type="button"
                onClick={() => onSelectColor(color)}
                aria-label={`Select ${color.name}`}
              >
                <span
                  className="saved-colors__preview"
                  style={{ backgroundColor: rgbValue }}
                />

                <span className="saved-colors__info">
                  <strong>{color.name}</strong>
                  <span>{hexValue}</span>
                </span>
              </button>

              <button
                className="saved-colors__button"
                type="button"
                onClick={() => handleCopy(`${color.id}-rgb`, rgbValue)}
              >
                {copiedValue === `${color.id}-rgb` ? "RGB copied" : "Copy RGB"}
              </button>

              <button
                className="saved-colors__button"
                type="button"
                onClick={() => handleCopy(`${color.id}-hex`, hexValue)}
              >
                {copiedValue === `${color.id}-hex` ? "HEX copied" : "Copy HEX"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SavedColors;
