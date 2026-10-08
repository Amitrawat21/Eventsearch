import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api  from "../../utils/axios.js";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaRegClock,
  FaTicketAlt,
  FaShieldAlt,
} from "react-icons/fa";
import "./Home.css";



const Home = () =>
{
    
    const [ events, setEvents ] = useState( [] );
    const [ search, setSearch ] = useState( '' );
    const [ loading, setLoading ] = useState( true );

        useEffect(() => {
          const timeoutId = setTimeout(() => {
            fetchEvents();
          }, 400); // 400ms debounce
          return () => clearTimeout(timeoutId);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ search ] );
    
        const fetchEvents = async () => {
          try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
          } catch (error) {
            console.error("Error fetching events:", error);
          } finally {
            setLoading(false);
          }
    };
    
    
    return (
      <div className="home-page">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-bg-image"></div>
          <div className="hero-bg-overlay"></div>
          <div className="hero-content">
            <span className="hero-badge">Welcome to EventHub</span>
            <h1 className="hero-title">
              Make Every Moment <br />
              <span className="hero-title-accent">Worth Remembering</span>
            </h1>
            <p className="hero-description">
              Discover the best tech conferences, late-night music festivals,
              and hands-on workshops happening directly in your area. Secure
              your spot today.
            </p>

            <div className="hero-search">
              <FaSearch className="hero-search-icon" />
              <input
                type="text"
                placeholder="Search events by title..."
                className="hero-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us / Features row */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaRegClock />
            </div>
            <h3 className="feature-title">Fast Booking</h3>
            <p className="feature-text">
              Secure your tickets instantly with our fast streamlined booking
              infrastructure built for speed.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaTicketAlt />
            </div>
            <h3 className="feature-title">Seamless Access</h3>
            <p className="feature-text">
              Download tickets instantly or manage them right from your personal
              dashboard with easily.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3 className="feature-title">Secure Platform</h3>
            <p className="feature-text">
              All transactions and registrations are bounded by cutting-edge
              security and 2FA OTP tech.
            </p>
          </div>
        </div>

        <div className="events-header">
          <h2 className="events-heading">Upcoming Events</h2>
          <div className="events-count">{events.length} results found</div>
        </div>

        {loading ? (
          <div className="state-message">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="state-message state-message-muted">
            No events found matching your search.
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-card-image-wrap">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-card-image"
                    />
                  ) : (
                    <div className="event-card-image-fallback">
                      {event.category || "Event"}
                    </div>
                  )}
                  <div className="event-card-price">
                    {event.ticketPrice === 0 ? (
                      <span className="event-card-price-free">FREE</span>
                    ) : (
                      <span>₹{event.ticketPrice}</span>
                    )}
                  </div>
                </div>
                <div className="event-card-body">
                  <div className="event-card-category">{event.category}</div>
                  <h2 className="event-card-title">{event.title}</h2>
                  <div className="event-card-meta">
                    <div className="event-card-meta-row">
                      <FaCalendarAlt className="event-card-meta-icon" />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="event-card-meta-row">
                      <FaMapMarkerAlt className="event-card-meta-icon" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="event-card-footer">
                    <div className="event-card-progress-track">
                      <div
                        className="event-card-progress-fill"
                        style={{
                          width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="event-card-seats">
                      {event.availableSeats} of {event.totalSeats} seats
                      remaining
                    </p>
                    <Link
                      to={`/events/${event._id}`}
                      className="event-card-link"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Section */}
        <footer className="home-footer">
          <div className="home-footer-brand">
            <FaTicketAlt className="home-footer-icon" />
            <span className="home-footer-name">Eventora</span>
          </div>
          <p className="home-footer-text">
            The simplest, most dynamic way to manage, discover, and host
            world-class events in your local city. Let's make memories together.
          </p>
          <div className="home-footer-copyright">
            &copy; {new Date().getFullYear()} Eventora Platform. All rights
            reserved.
          </div>
        </footer>
      </div>
    );
    
}

export default Home;
