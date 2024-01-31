/* eslint-disable react/prop-types */

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const TvShowCard = ({ item, key }) => {
  console.log(item);
  return (
    <div key={key}>
      {item.show.image && (
        <div key={item.id}>
          <div className="tv-card">
            <img
              src={item.show.image.medium}
              alt={`${item.show.name} TV Show Image`}
            />
            <div className="tv-card-content">
              <div className="tv-card-title">{item.show.name}</div>
              {/* <div
                      className="tv-card-description"
                      dangerouslySetInnerHTML={{
                        __html: item.show.summary,
                      }}
                    /> */}
              <div className="tv-card-info">
                <div>Genres: {item.show.genres.join(", ")}</div>
                <div>Status: {item.show.status}</div>
              </div>

              <div className="tv-card-info">
                <div>Language: {item.show.language}</div>
                <div>Runtime: {item.show.runtime} minutes</div>
              </div>

              <div className="tv-card-info">
                <div>Premiered: {item.show.premiered}</div>
                <div>Rating: {item.show.rating.average}</div>
              </div>

              <div className="tv-card-info">
                <div>Network: </div>
              </div>

              <Link to={`/details/${item.show.id}`}>View Details</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvShowCard;
