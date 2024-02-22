import "./feature.css";
import data from "../../assets/data/dataFeature.json";

export function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {data.map((feature, idx) => (
        <div className="feature-item" key={idx}>
          <img src={feature.icon} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
