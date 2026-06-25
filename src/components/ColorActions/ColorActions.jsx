import { useState } from "react";

import "./ColorActions.css";

const ColorActions = ({ color }) => {
  const [colorName, setColorName] = useState("");

  const rgbValue = `rgb(${color.r}, ${color.g}, ${color.b})`;

  const toHex = (value) => {
    return value.toString(16).padStart(2, "0").toUpperCase();
  };

  const hexValue = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;

  const handleCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Could not copy color value:", error);
    }
  };

  const handleSave = () => {
    console.log({
      name: colorName,
      ...color,
      hex: hexValue,
    });
  };

  return (
    <section className="color-actions">
      <div className="color-actions__values">
        <div className="color-actions__value-row">
          <span className="color-actions__label">RGB</span>
          <code className="color-actions__code">{rgbValue}</code>
          <button
            className="color-actions__button"
            type="button"
            onClick={() => handleCopy(rgbValue)}
          >
            Copy RGB
          </button>
        </div>

        <div className="color-actions__value-row">
          <span className="color-actions__label">HEX</span>
          <code className="color-actions__code">{hexValue}</code>
          <button
            className="color-actions__button"
            type="button"
            onClick={() => handleCopy(hexValue)}
          >
            Copy HEX
          </button>
        </div>
      </div>

      <form className="color-actions__form">
        <label className="color-actions__name-label" htmlFor="color-name">
          Name
        </label>

        <input
          className="color-actions__input"
          id="color-name"
          type="text"
          value={colorName}
          onChange={(event) => setColorName(event.target.value)}
          placeholder="Lulu Bubu blue"
        />

        <button
          className="color-actions__save-button"
          type="button"
          onClick={handleSave}
        >
          Speichern
        </button>
      </form>
    </section>
  );
};

export default ColorActions;
