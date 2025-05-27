/*import React from "react";
import { data } from "../restApi.json";
const Team = () => {
  return (
    <section className="team" id="team">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">OUR TEAM</h1>
          <p>
          At Bhoosha, our passionate team is the heart of everything we do. From expert chefs who craft every dish with love, to our friendly staff who ensure a warm and welcoming experience, each member is dedicated to delivering excellence.
          </p>
        </div>
        <div className="team_container">
          {data[0].team.map((element) => {
            return (
              <div className="card" key={element.id}>
                <img src={element.image} alt={element.name} />
                <h3>{element.name}</h3>
                <p>{element.designation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team; */
import React, { useState } from "react";
import { data } from "../restApi.json";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleClick = (id) => {
    setSelectedMember(selectedMember === id ? null : id);
  };

  return (
    <section className="team" id="team">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">OUR TEAM</h1>
          <p>
            At Bhoosha, our passionate team is the heart of everything we do.
            From expert chefs who craft every dish with love, to our friendly 
            staff who ensure a warm and welcoming experience, each member is 
            dedicated to delivering excellence.
          </p>
        </div>
        <div className="team_container">
          {data[0].team.map((member) => (
            <div
              className="card"
              key={member.id}
              onClick={() => handleClick(member.id)}
            >
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.designation}</p>
              {selectedMember === member.id && (
                <div className="description">{member.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
