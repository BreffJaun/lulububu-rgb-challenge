import Slider from "@rc-component/slider";
import "@rc-component/slider/assets/index.css";
import "./ColorSlider.css";

const ColorSlider = ({ color, setColor }) => {
  const handleChange = (channel, value) => {
    setColor((currentColor) => ({
      ...currentColor,
      [channel]: value,
    }));
  };

  return (
    <section className="color-slider">
      {[
        { label: "R", channel: "r" },
        { label: "G", channel: "g" },
        { label: "B", channel: "b" },
      ].map(({ label, channel }) => (
        <div className="color-slider__row" key={channel}>
          <span className="color-slider__label">{label}</span>

          <Slider
            min={0}
            max={255}
            value={color[channel]}
            onChange={(value) => handleChange(channel, value)}
          />

          <span className="color-slider__value">{color[channel]}</span>
        </div>
      ))}
    </section>
  );
};

export default ColorSlider;
