import "./feature.css";
import data from "../../data/dataFeature.json";

export function Features() {
  const featureData = data;

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featureData.map((feature) => (
        <div className="feature-item">
          <img src={feature.img} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
