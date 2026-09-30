import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

function Home() {
  return (
    <>
      <section className="hero-section">
        <h1>Rent What You Need</h1>
        <p>Find cameras, tools and equipment easily with RentalHub.</p>
        <Link to="/equipment" className="primary-btn">
          Browse Equipment
        </Link>
      </section>

      <section className="equipment-section">
        <h2>Available Equipment</h2>

        <div className="equipment-grid">
          <div className="equipment-card">
            <h3>Canon Camera</h3>
            <p>Professional camera for photography.</p>
            <strong>₹1000 / day</strong>
          </div>

          <div className="equipment-card">
            <h3>Drill Machine</h3>
            <p>Powerful drill machine for projects.</p>
            <strong>₹500 / day</strong>
          </div>

          <div className="equipment-card">
            <h3>Projector</h3>
            <p>HD projector for meetings and events.</p>
            <strong>₹800 / day</strong>
          </div>
        </div>
      </section>
    </>
  );
}

function Equipment()  {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/equipment")
      .then((response) => response.json())
      .then((data) => {
        setEquipment(data);
      })
      .catch((error) => {
        console.error("Failed to fetch equipment:", error);
      });
  }, []);

  return (
    <div className="page">
      <h1>Equipment</h1>
      <p>Browse all available rental equipment.</p>

      <div className="equipment-grid">
        {equipment.map((item) => (
          <div className="equipment-card" key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <strong>₹{item.pricePerDay} / day</strong>

            <br />
            <br />

            <Link
              to={`/equipment/${item._id}`}
              className="primary-btn"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
function EquipmentDetails() {
  return (
    <div className="page">
      <h1>Equipment Details</h1>

      <h2>Canon Camera</h2>

      <p>Professional camera for photography.</p>

      <h3>₹1000 / day</h3>

      <p>📍 Coimbatore</p>

      <p>👤 RentalHub Owner</p>

      <Link to="/book" className="primary-btn">
  Book Now
</Link>
    </div>
  );
}
function Booking() {
  const handleBooking = async (e) => {
    e.preventDefault();

    const form = e.target;

    const bookingData = {
      customer: "6abc7a38cfd66ed018b23545",
      equipment: "6abc71520c1720f690eac813",
      owner:  "6abc71520c1720f690eac813",
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      totalAmount: 1000,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (error) {
      alert("Backend server is not connected");
    }
  };

  return (
    <div className="page">
      <h1>Book Equipment</h1>

      <form onSubmit={handleBooking}>
        <label>Start Date</label>
        <input type="date" name="startDate" required />

        <label>End Date</label>
        <input type="date" name="endDate" required />

        <button type="submit" className="primary-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const loginData = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Backend server is not connected");
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </div>
  );
}

function Register() {
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      address: form.address.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Backend server is not connected");
    }
  };

  return (
    <div className="page">
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input name="phone" type="text" placeholder="Phone" />
        <input name="address" type="text" placeholder="Address" />

        <button type="submit" className="primary-btn">
          Register
        </button>
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>
          <Link to="/">RentalHub</Link>
        </h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/equipment">Equipment</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<Booking />} />
      </Routes>

      <footer>
        <p>© 2026 RentalHub. All rights reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;