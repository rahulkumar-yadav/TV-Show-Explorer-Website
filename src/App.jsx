import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TvShowCard from "./TvShowCard";
import DetailView from "./DetailView";

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="container">
                <nav className="navbar">
                  <h2>TV Shows</h2>
                </nav>
                <div className="container">
                  {data.map((item) => (
                    <TvShowCard key={item.show.id} item={item} />
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/details/:showId" element={<DetailView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default MyComponent;
