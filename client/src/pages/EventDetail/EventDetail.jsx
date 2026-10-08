import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../utils/axios.js";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChair,
  FaMoneyBillWave,
} from "react-icons/fa";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setBookingLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (!showOTP) {
        await api.post("/bookings/send-otp");
        setShowOTP(true);
        setSuccessMsg(
          "OTP sent to your email. Please verify to confirm booking.",
        );
      } else {
        await api.post("/bookings", { eventId: event._id, otp });
        setSuccessMsg("Booking requested! Awaiting admin confirmation.");
        setShowOTP(false);
        // Update local seats count dynamically after booking
        setEvent({ ...event, availableSeats: event.availableSeats - 1 });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="state-message">Loading...</div>;
  if (error && !event)
    return (
      <div className="state-message state-message-error">
        {error || "Event not found"}
      </div>
    );

  const isSoldOut = event.availableSeats <= 0;

  return (
    <div className="event-detail">
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="event-detail-image"
        />
      ) : (
        <div className="event-detail-image-fallback">{event.category}</div>
      )}

      <div className="event-detail-body">
        <div className="event-detail-top">
          <div>
            <div className="event-detail-category">{event.category}</div>
            <h1 className="event-detail-title">{event.title}</h1>
            <p className="event-detail-description">{event.description}</p>
          </div>

          <div className="booking-panel">
            <h3 className="booking-panel-heading">Booking Details</h3>

            <div className="booking-info-list">
              <div className="booking-info-row">
                <div className="booking-info-icon">
                  <FaMoneyBillWave />
                </div>
                <div>
                  <p className="booking-info-label">Ticket Price</p>
                  <p className="booking-info-value">
                    {event.ticketPrice === 0 ? (
                      <span className="text-free">Free</span>
                    ) : (
                      `₹${event.ticketPrice}`
                    )}
                  </p>
                </div>
              </div>

              <div className="booking-info-row">
                <div className="booking-info-icon">
                  <FaChair />
                </div>
                <div>
                  <p className="booking-info-label">Availability</p>
                  <p className="booking-info-value">
                    <span
                      className={
                        event.availableSeats < 10 ? "text-low-seats" : ""
                      }
                    >
                      {event.availableSeats}
                    </span>{" "}
                    / {event.totalSeats}
                  </p>
                </div>
              </div>

              <div className="booking-info-row">
                <div className="booking-info-icon">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="booking-info-label">Date</p>
                  <p className="booking-info-value">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="booking-info-row">
                <div className="booking-info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="booking-info-label">Location</p>
                  <p className="booking-info-value">{event.location}</p>
                </div>
              </div>
            </div>

            {showOTP && (
              <div className="booking-otp-field">
                <label className="field-label">Enter OTP to Confirm</label>
                <input
                  type="text"
                  required
                  placeholder="6-digit code"
                  className="field-input field-input-otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />
              </div>
            )}

            <button
              onClick={handleBooking}
              disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
              className={`booking-submit ${isSoldOut || (successMsg && !showOTP) ? "booking-submit-disabled" : "booking-submit-active"}`}
            >
              {bookingLoading
                ? "Processing..."
                : showOTP
                  ? "Verify OTP & Confirm"
                  : successMsg && !showOTP
                    ? "Request Sent"
                    : isSoldOut
                      ? "Sold Out"
                      : "Confirm Registration"}
            </button>
            {error && (
              <p className="booking-message booking-message-error">{error}</p>
            )}
            {successMsg && (
              <p className="booking-message booking-message-success">
                {successMsg}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
