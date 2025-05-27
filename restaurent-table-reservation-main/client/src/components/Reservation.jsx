import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import reservationImage from "/assets/reservation2.png";

const Reservation = () => {
  const [tab, setTab] = useState("reserve");

  // Reservation States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [tableCategory, setTableCategory] = useState(""); 

  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !date || !time || !phone || !tableCategory) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5001/reservation/send_reservation",
        { firstName, lastName, email, phone, date, time, tableCategory }, 
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setTime("");
      setDate("");
      setTableCategory(""); // Reset tableCategory
      navigate("/success");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancellation = async (e) => {
    e.preventDefault();
    if (!email || !date || !time || !tableCategory) {
      toast.error("Please provide email, date, time, and table category");
      return;
    }

    try {
      const response = await axios.delete("http://localhost:5001/reservation/cancel", {
        data: { email, date, time, tableCategory } 
      });
      toast.success(response.data.message);
      setEmail("");
      setDate("");
      setTime("");
      setTableCategory(""); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancellation failed");
    }
  };

  return (
    <section className="reservation" id="reservation" style={{ fontSize: "18px" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="banner" style={{ flex: 1 }}>
          <img
            src={reservationImage}
            alt="Reservation"
            style={{ width: "100%", height: "auto", maxWidth: "700px" }}
          />
        </div>

        <div className="banner" style={{ flex: 1 }}>
          <div className="reservation_form_box" style={{ padding: "20px", fontSize: "20px" }}>
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
              {tab === "reserve" ? "MAKE A RESERVATION" : "CANCEL RESERVATION"}
            </h1>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                onClick={() => setTab("reserve")}
                style={{ fontWeight: tab === "reserve" ? "bold" : "normal" }}
              >
                Reserve
              </button>
              <button
                onClick={() => setTab("cancel")}
                style={{ fontWeight: tab === "cancel" ? "bold" : "normal" }}
              >
                Cancel
              </button>
            </div>

            {tab === "reserve" ? (
              <form onSubmit={handleReservation}>
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    value={tableCategory}
                    onChange={(e) => setTableCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Table Category</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <button type="submit" style={{ cursor: "pointer", fontSize: "18px", marginTop: "10px" }}>
                  RESERVE NOW <HiOutlineArrowNarrowRight />
                </button>
              </form>
            ) : (
              <form onSubmit={handleCancellation}>
                <input
                  type="email"
                  placeholder="Email used for reservation"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <select
                  value={tableCategory}
                  onChange={(e) => setTableCategory(e.target.value)}
                  required
                >
                  <option value="">Select Table Category</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
                <button type="submit" style={{ cursor: "pointer", fontSize: "18px", marginTop: "10px" }}>
                  CANCEL RESERVATION <HiOutlineArrowNarrowRight />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
