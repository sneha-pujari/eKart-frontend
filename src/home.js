import { useState } from "react";
import { categories, slider } from "./home-data";
import { Products } from "./Products";

function CarouselImage({ activeSlider }) {
  return (
    <div
      className="carouselbg"
      style={{ backgroundImage: `url(${slider[activeSlider].url})` }}
    >
      <div class="carouseltextcontainer">
        <h2 className="carousel-text">{slider[activeSlider].text}</h2>
      </div>
    </div>
  );
}

function CarouselNavbar({ activeSlider, setActiveSlider }) {
  return (
    <div>
      {/* <h1>Home</h1> */}
      {slider.map((_, i) => (
        <span
          key={i}
          className={`carouselNav ${
            activeSlider === i ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setActiveSlider(i)}
        ></span>
      ))}
    </div>
  );
}

function Carousel() {
  const [activeSlider, setActiveSlider] = useState(0);
  return (
    <div>
      <CarouselImage
        activeSlider={activeSlider}
        setActiveSlider={setActiveSlider}
      />
      <CarouselNavbar
        activeSlider={activeSlider}
        setActiveSlider={setActiveSlider}
      />
    </div>
  );
}

export function Home({ setRoute }) {
  function Category() {
    return (
      <div>
        <h1 style={{ fontWeight: "200", marginTop: "2rem" }}>CATEGORIES</h1>
        <div className="category-box" onClick={() => setRoute("products")}>
          {categories.map((category) => {
            return (
              <div onClick={() => <Products />}>
                <img
                  className="category-card"
                  src={category.thumbnail}
                  alt={category.name}
                />
                <h3>{category.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Carousel />
      <Category />
    </div>
  );
}
