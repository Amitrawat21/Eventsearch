import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    totalSeats: "",
    ticketPrice: "",
    image: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [eventsRes, bookingsRes] = await Promise.all([
        api.get("/events"),
        api.get("/bookings/my"), // Admin gets all bookings
      ]);
      setEvents(eventsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", formData);
      setShowEventForm(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        totalSeats: "",
        ticketPrice: "",
        image: "",
      });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating event");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        fetchData();
      } catch (error) {
        alert("Error deleting event");
      }
    }
  };

  const handleConfirmBooking = async (id, paymentStatus) => {
    try {
      await api.put(`/bookings/${id}/confirm`, { paymentStatus });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error confirming booking");
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Cancel this user's booking request?")) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || "Error cancelling booking");
      }
    }
  };

  if (loading)
    return <div className="state-message">Loading admin panel...</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1 className="admin-header-title">Admin Dashboard</h1>
          <p className="admin-header-subtitle">
            Manage events and manually confirm bookings.
          </p>
        </div>
        <button
          onClick={() => setShowEventForm(!showEventForm)}
          className="admin-header-btn"
        >
          {showEventForm ? "Cancel Creation" : "+ Create New Event"}
        </button>
      </div>

      {/* Admin Stats Row */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card card">
          <div>
            <p className="admin-stat-label">Total Revenue</p>
            <h3 className="admin-stat-value admin-stat-value-green">
              ₹
              {bookings.reduce(
                (sum, b) =>
                  b.paymentStatus === "paid" && b.status === "confirmed"
                    ? sum + b.amount
                    : sum,
                0,
              )}
            </h3>
          </div>
          <div className="admin-stat-icon admin-stat-icon-green">₹</div>
        </div>
        <div className="admin-stat-card card">
          <div>
            <p className="admin-stat-label">Paid Clients</p>
            <h3 className="admin-stat-value admin-stat-value-blue">
              {
                new Set(
                  bookings
                    .filter(
                      (b) =>
                        b.paymentStatus === "paid" && b.status === "confirmed",
                    )
                    .map((b) => b.userId?._id),
                ).size
              }
            </h3>
          </div>
          <div className="admin-stat-icon admin-stat-icon-blue">👤</div>
        </div>
        <div className="admin-stat-card card">
          <div>
            <p className="admin-stat-label">Pending Requests</p>
            <h3 className="admin-stat-value admin-stat-value-yellow">
              {bookings.filter((b) => b.status === "pending").length}
            </h3>
          </div>
          <div className="admin-stat-icon admin-stat-icon-yellow">⏳</div>
        </div>
      </div>

      {showEventForm && (
        <div className="admin-event-form-card card">
          <h2 className="admin-event-form-title">Create New Event</h2>
          <form onSubmit={handleCreateEvent} className="admin-event-form">
            <input
              required
              type="text"
              placeholder="Event Title"
              className="admin-form-input"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              required
              type="text"
              placeholder="Category (e.g., Tech, Music)"
              className="admin-form-input"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <input
              required
              type="date"
              className="admin-form-input"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <input
              required
              type="text"
              placeholder="Location"
              className="admin-form-input"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
            <input
              required
              type="number"
              placeholder="Total Seats"
              className="admin-form-input"
              value={formData.totalSeats}
              onChange={(e) =>
                setFormData({ ...formData, totalSeats: e.target.value })
              }
            />
            <input
              required
              type="number"
              placeholder="Ticket Price (0 for free)"
              className="admin-form-input"
              value={formData.ticketPrice}
              onChange={(e) =>
                setFormData({ ...formData, ticketPrice: e.target.value })
              }
            />

            <div className="admin-form-full">
              <input
                type="text"
                placeholder="Image URL (Provide any direct link to an image)"
                className="admin-form-input admin-form-input-block"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <textarea
              required
              placeholder="Event Description"
              className="admin-form-input admin-form-full admin-form-textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <button type="submit" className="admin-form-submit admin-form-full">
              Publish Event
            </button>
          </form>
        </div>
      )}

      <div className="admin-lists-grid">
        {/* Events Section */}
        <div className="admin-list-column">
          <h2 className="admin-list-heading">
            <span className="admin-list-count admin-list-count-gray">
              {events.length}
            </span>
            All Events
          </h2>
          <div className="admin-list-card card">
            <ul className="admin-list">
              {events.length === 0 ? (
                <li className="admin-list-empty">No events created yet.</li>
              ) : (
                events.map((event) => (
                  <li key={event._id} className="admin-event-row">
                    <div>
                      <h4 className="admin-event-title">{event.title}</h4>
                      <div className="admin-event-meta">
                        <span className="admin-event-meta-item">
                          <span className="admin-dot admin-dot-blue"></span>{" "}
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="admin-event-meta-item">
                          <span
                            className={`admin-dot ${event.availableSeats > 0 ? "admin-dot-green" : "admin-dot-red"}`}
                          ></span>{" "}
                          {event.availableSeats}/{event.totalSeats} seats
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="admin-delete-btn"
                    >
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="admin-list-column">
          <h2 className="admin-list-heading">
            <span className="admin-list-count admin-list-count-yellow">
              {bookings.length}
            </span>
            Booking Requests
          </h2>
          <div className="admin-list-card card">
            <ul className="admin-list">
              {bookings.length === 0 ? (
                <li className="admin-list-empty">No bookings yet.</li>
              ) : (
                bookings.map((booking) => (
                  <li
                    key={booking._id}
                    className={`admin-booking-row admin-booking-row-${booking.status}`}
                  >
                    <div className="admin-booking-top">
                      <h4 className="admin-booking-title">
                        {booking.eventId?.title || "Deleted Event"}
                      </h4>
                      <div className="admin-booking-badges">
                        <span
                          className={`badge ${booking.status === "confirmed" ? "badge-green" : booking.status === "cancelled" ? "badge-red" : "badge-yellow"}`}
                        >
                          {booking.status}
                        </span>
                        {booking.status !== "cancelled" && (
                          <span
                            className={`badge ${booking.paymentStatus === "paid" ? "badge-indigo" : "badge-gray"}`}
                          >
                            {booking.paymentStatus.replace("_", " ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="admin-booking-details">
                      <p className="admin-booking-detail-row">
                        <span className="admin-booking-detail-label">
                          User:
                        </span>
                        <span className="admin-booking-detail-strong">
                          {booking.userId?.name}
                        </span>
                        <span className="admin-booking-detail-muted">
                          ({booking.userId?.email})
                        </span>
                      </p>
                      <p className="admin-booking-detail-row">
                        <span className="admin-booking-detail-label">
                          Amount:
                        </span>
                        <span
                          className={
                            booking.amount === 0
                              ? "text-free"
                              : "admin-booking-detail-strong"
                          }
                        >
                          {booking.amount === 0 ? "Free" : `₹${booking.amount}`}
                        </span>
                      </p>
                      <p className="admin-booking-detail-row">
                        <span className="admin-booking-detail-label">
                          Date:
                        </span>
                        <span>
                          {new Date(booking.bookedAt).toLocaleString()}
                        </span>
                      </p>
                      {booking.eventId && (
                        <p className="admin-booking-detail-row admin-booking-detail-seats">
                          <span className="admin-booking-detail-label">
                            Seats:
                          </span>
                          <span
                            className={
                              booking.eventId.availableSeats > 0
                                ? "admin-booking-seats-ok"
                                : "admin-booking-seats-none"
                            }
                          >
                            {booking.eventId.availableSeats}
                          </span>{" "}
                          remaining of {booking.eventId.totalSeats}
                        </p>
                      )}
                    </div>

                    {/* Action buttons for admin */}
                    {booking.status === "pending" && (
                      <div className="admin-booking-actions">
                        <button
                          onClick={() =>
                            handleConfirmBooking(booking._id, "paid")
                          }
                          className="admin-action-btn admin-action-approve-paid"
                        >
                          ✓ Approve as Paid
                        </button>
                        <button
                          onClick={() =>
                            handleConfirmBooking(booking._id, "not_paid")
                          }
                          className="admin-action-btn admin-action-approve-undecided"
                        >
                          ✓ Approve Undecided
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="admin-action-btn admin-action-reject"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
