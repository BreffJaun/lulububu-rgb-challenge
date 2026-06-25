import { useState, useEffect } from "react";
import ColorSlider from "./components/ColorSlider/ColorSlider";
import ColorPreview from "./components/ColorPreview/ColorPreview";
import ColorActions from "./components/ColorActions/ColorActions.jsx";
import SavedColors from "./components/SavedColors/SavedColors";

function App() {
  const [color, setColor] = useState({
    r: 31,
    g: 149,
    b: 255,
  });

  const [colorName, setColorName] = useState("");

  const [savedColors, setSavedColors] = useState([]);

  const loadSavedColors = async () => {
    try {
      const response = await fetch("http://localhost:8000/colors");

      const data = await response.json();

      setSavedColors(data);
    } catch (error) {
      console.error("Could not load saved colors:", error);
    }
  };

  const handleSaveColor = async (colorName) => {
    try {
      await fetch("http://localhost:8000/colors", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: colorName,
          ...color,
        }),
      });

      await loadSavedColors();
    } catch (error) {
      console.error("Could not save color:", error);
    }
  };

  const handleDeleteColor = async (id) => {
    try {
      await fetch(`http://localhost:8000/colors/${id}`, {
        method: "DELETE",
      });

      await loadSavedColors();
    } catch (error) {
      console.error("Could not delete color:", error);
    }
  };

  const handleSelectColor = (savedColor) => {
    setColor({
      r: Number(savedColor.red_value),
      g: Number(savedColor.green_value),
      b: Number(savedColor.blue_value),
    });

    setColorName(savedColor.name);
  };

  useEffect(() => {
    loadSavedColors();
  }, []);

  return (
    <main className="app">
      <h1>LuluBubu RGB Challenge</h1>

      <section className="color-control">
        <ColorSlider color={color} setColor={setColor} />

        <ColorPreview color={color} />
      </section>

      <ColorActions
        color={color}
        colorName={colorName}
        setColorName={setColorName}
        onSaveColor={handleSaveColor}
      />

      <SavedColors
        colors={savedColors}
        onDeleteColor={handleDeleteColor}
        onSelectColor={handleSelectColor}
      />
    </main>
  );
}

export default App;
