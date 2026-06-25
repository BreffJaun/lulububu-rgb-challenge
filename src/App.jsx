import { useState } from "react";
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

  return (
    <main className="app">
      <h1>LuluBubu RGB Challenge</h1>

      <section className="color-control">
        <ColorSlider color={color} setColor={setColor} />

        <ColorPreview color={color} />
      </section>

      <ColorActions color={color} />

      <SavedColors />
    </main>
  );
}

export default App;
