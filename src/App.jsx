import { useState } from "react";
import ColorSlider from "./components/ColorSlider/ColorSlider";
import ColorPreview from "./components/ColorPreview/ColorPreview";
import SavedColors from "./components/SavedColors/SavedColors";

function App() {
  const [color, setColor] = useState({
    r: 132,
    g: 129,
    b: 116,
  });

  return (
    <main className="app">
      <h1>LuluBubu RGB Challenge</h1>

      <section className="color-control">
        <ColorSlider color={color} setColor={setColor} />

        <ColorPreview color={color} />
      </section>

      <SavedColors />
    </main>
  );
}

export default App;
