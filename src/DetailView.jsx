import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailView.css";

const DetailView = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    seats: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();

        const matchingShow = data.find(
          (item) => item.show.id.toString() === showId
        );

        setShowDetails(matchingShow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showId]);

  console.log(showDetails);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
    togglePopup();
    alert("Successfully Booked!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value,
    });
  };

  return (
    showDetails && (
      <div className="detail-view" key={showId}>
        <div className="image-container">
          <img
            src={showDetails.show.image.medium}
            alt={showDetails.show.name}
          />
        </div>

        <div className="content">
          <h1>{showDetails.show.name}</h1>
          <div className="show-info">
            <p>Type: {showDetails.show.type}</p>

            <p>Genres: {showDetails.show.genres.join(", ")}</p>

            <p>
              Schedule: {showDetails.show.schedule.time} on{" "}
              {showDetails.show.schedule.days.join(", ")}
            </p>
          </div>

          <div
            className="show-summary"
            dangerouslySetInnerHTML={{ __html: showDetails.show.summary }}
          />

          <button className="book-now-button" onClick={togglePopup}>
            Book Now
          </button>
        </div>

        {showPopup && (
          <div className="popup">
            <h1>{showDetails.show.name}</h1>

            <div className="show-info">
              <p>Type: {showDetails.show.type}</p>

              <p>Genres: {showDetails.show.genres.join(", ")}</p>

              <p>
                Schedule: {showDetails.show.schedule.time} on{" "}
                {showDetails.show.schedule.days.join(", ")}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={bookingInfo.name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="seats"
                placeholder="Number of Seats"
                value={bookingInfo.seats}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={bookingInfo.email}
                onChange={handleInputChange}
              />
              <div
                className="container"
                style={{ justifyContent: "space-between" }}
              >
                {" "}
                <button type="submit">Submit</button>
                <button className="close-popup" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  );
};

export default DetailView;
