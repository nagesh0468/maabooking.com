import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import api from "./api";
import useStore from "./store"; 

function FetchHotels() {
  const { data: hotels, isLoading, error } = useQuery("hotels", async () => {
    const response = await api.get("/hotels");
    return response.data;
  });

  const user = useStore((state) => state.user); 
  const navigate = useNavigate();

  const handleBookNow = (hotel) => {
    if (hotel.availableRooms === 0) {
      alert("No rooms available for this hotel.");
      return; 
    }
  
    if (!user) {
      alert("Please log in to book a hotel.");
      navigate("/signin"); 
    } else {
      navigate("/booking", { state: { selectedHotel: hotel } });
    }
  };

  if (isLoading) return <p>Loading hotels...</p>;
  if (error) return <p>Error fetching hotels: {error.message}</p>;

  return (
    <section id="types">
      <div className="type box">
        <div className="t_title box">
          <h1>Our Hotels</h1>
        </div>
        <div className="slider box" id="container">
          {hotels.map((hotel) => (
            <div className="card" key={hotel.id}>
              <div className="card_img">
                <img src={hotel.imageUrl} alt={hotel.name} width="100%" height="100%" />
              </div>
              <div className="details">
                <div className="name">
                  <span>{hotel.name}</span>
                </div>
                <p>Location: {hotel.location}</p>
                <p>Price per Night: ${hotel.pricePerNight}</p>
                <p>Available Rooms: {hotel.availableRooms === 0
                 ? <span className="not">Not available</span> 
                    : ` ${hotel.availableRooms}`}</p>
                <button className="book_btn" onClick={() => handleBookNow(hotel)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FetchHotels;
