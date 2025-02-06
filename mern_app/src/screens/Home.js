import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();

      // Ensure foodCat and foodItem are always arrays
      setFoodItem(Array.isArray(data[0]) ? data[0] : []);
      setFoodCat(Array.isArray(data[1]) ? data[1] : []);

      console.log("Data Loaded:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
          </div>
        </div>
      </div>

      <div className="container">
        {foodCat.map((data) => (
          <div className="row mb-3" key={data._id}>
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr />
            {foodItem
              .filter(
                (item) =>
                  item.CategoryName === data.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filterItems) => (
                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                  <Card foodItem={filterItems} options={filterItems.options[0]} />
                </div>
              ))}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
