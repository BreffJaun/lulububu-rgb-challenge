import "./ColorPreview.css";

const ColorPreview = ({ color }) => {
  const rgbValue = `rgb(${color.r}, ${color.g}, ${color.b})`;

  return (
    <section className="color-preview">
      <div
        className="color-preview__box"
        style={{ backgroundColor: rgbValue }}
      />
    </section>
  );
};

export default ColorPreview;
