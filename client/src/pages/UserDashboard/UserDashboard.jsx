import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaTimesCircle } from "react-icons/fa";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (
      window.confirm("Are you sure you want to cancel this booking request?")
    ) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        alert(error.response?.data?.message || "Error cancelling booking");
      }
    }
  };

  if (loading) return <div className="state-message">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header card">
        <div className="dashboard-avatar">{user?.name.charAt(0)}</div>
        <div className="dashboard-header-info">
          <h1 className="dashboard-welcome">Welcome, {user?.name}!</h1>
          <p className="dashboard-subtitle">
            <span className="status-dot"></span> User Dashboard
          </p>
        </div>
      </div>

      <div className="dashboard-section-header">
        <h2 className="dashboard-section-title">
          <FaTicketAlt className="dashboard-section-icon" /> My Bookings
          requests
        </h2>
      </div>

      {bookings.length === 0 ? (
        <div className="dashboard-empty card">
          <div className="dashboard-empty-icon-wrap">
            <FaTicketAlt className="dashboard-empty-icon" />
          </div>
          <p className="dashboard-empty-text">
            You haven't booked any events yet.
          </p>
          <Link to="/" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card card">
              <div className="booking-card-body">
                {booking.eventId ? (
                  <>
                    <div className="booking-card-top">
                      <h3 className="booking-card-title">
                        {booking.eventId.title}
                      </h3>
                      <div className="booking-card-badges">
                        <span
                          className={`badge ${
                            booking.status === "confirmed"
                              ? "badge-green"
                              : booking.status === "cancelled"
                                ? "badge-red"
                                : "badge-yellow"
                          }`}
                        >
                          {booking.status}
                        </span>
                        {booking.status !== "cancelled" && (
                          <span
                            className={`badge ${booking.paymentStatus === "paid" ? "badge-blue" : "badge-gray"}`}
                          >
                            {booking.paymentStatus.replace("_", " ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="booking-card-meta">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(booking.eventId.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        {booking.amount === 0 ? "Free" : `₹${booking.amount}`}
                      </p>
                      <p>
                        <strong>Requested:</strong>{" "}
                        {new Date(booking.bookedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="booking-card-deleted">
                    Event details unavailable (might have been deleted)
                  </p>
                )}
              </div>
              <div className="booking-card-footer">
                {booking.eventId && booking.status !== "cancelled" ? (
                  <>
                    <Link
                      to={`/events/${booking.eventId._id}`}
                      className="booking-card-view-link"
                    >
                      View Event
                    </Link>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="booking-card-cancel-btn"
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  </>
                ) : (
                  <div className="booking-card-cancelled-note">
                    Booking Cancelled
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
