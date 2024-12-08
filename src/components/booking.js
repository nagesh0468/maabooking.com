import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "./api";
import useStore from "./store";

function BookingForm() {
  const location = useLocation();
  const selectedHotel = location.state?.selectedHotel;
  const [guestName, setGuestName] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const user = useStore((state) => state.user);
    
  const bookingMutation = useMutation(
    (newBooking) => api.post("/bookings", newBooking),
    {
      onSuccess: () => {
       
        updateRoomsMutation.mutate({
          id: selectedHotel.id,
          availableRooms: selectedHotel.availableRooms - 1,
        });
      },
    }
  );

 
  const updateRoomsMutation = useMutation(
    (updatedHotel) =>
      api.patch(`/hotels/${updatedHotel.id}`, {
        availableRooms: updatedHotel.availableRooms,
      }),
    {
      onSuccess: () => {
        alert("Booking successful!");
        queryClient.invalidateQueries("hotels"); 
        navigate("/"); 
      },
    }
  );

  if (!selectedHotel) {
    return (
      <div>
        <p>No hotel selected. Please go back and select a hotel.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleBooking = () => {
   

    if (!user) {
      alert("Please log in to make a booking.");
      return;
    }
  
    if (!guestName) {
      alert("Please enter your name.");
      return;
    }
    bookingMutation.mutate({
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      guestName,
      userId: user.id, 
      userName: user.name, 
    });
  };

  return (
    <section className="sign box">
      <div className="signContainer">
        <div className="top box">
          <div>
            <h4>Hotel Booking</h4>
          </div>
          <div>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
        <form>
          <div className="input">
            <p>Hotel Name</p>
            <div>
              <input
                type="text"
                value={selectedHotel.name}
                readOnly 
              />
            </div>
          </div>
          <div className="input">
            <p>Location</p>
            <div>
              <input
                type="text"
                value={selectedHotel.location}
                readOnly 
              />
            </div>
          </div>
          <div className="input">
            <p>Price per Night</p>
            <div>
              <input
                type="text"
                value={`$${selectedHotel.pricePerNight}`}
                readOnly 
              />
            </div>
          </div>
          <div className="input">
            <p>Guest Name</p>
            <div>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div className="sign_botton box">
            <button onClick={handleBooking} disabled={bookingMutation.isLoading}>
              {bookingMutation.isLoading ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
          {bookingMutation.isError && <p>Error submitting booking. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
