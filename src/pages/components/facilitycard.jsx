import React from "react";
import styled from "styled-components";

const Card = ({ name, location }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="image" />
        <div className="card-info">
          <span>{name}</span>
          <p>{location}</p>
          <a className="button">Book Now</a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 200px; /* reduced size */
    height: 300px; /* let content decide height */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    text-align: center;
    gap: 15px;
    background-color: #fffffe;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .card::before {
    content: "";
    width: 100%;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: linear-gradient(
      40deg,
      rgba(131, 58, 180, 1) 0%,
      rgba(253, 29, 29, 1) 50%,
      rgba(252, 176, 69, 1) 100%
    );
    transition: all 0.5s ease;
    z-index: 0;
  }

  .card * {
    z-index: 1;
  }

  .image {
    width: 80px;
    height: 80px;
    background-color: #1468bf;
    border-radius: 50%;
    border: 4px solid #fefefe;
    margin-top: 40px;
    transition: transform 0.5s ease;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
  }

  .card-info span {
    font-weight: 600;
    font-size: 20px;
    color: #161a42;
  }

  .card-info p {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
  }

  .button {
    margin-top: 10px;
    text-decoration: none;
    background-color: #1468bf;
    color: white;
    padding: 6px 16px;
    border-radius: 6px;
    border: 1px solid white;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  /* Hover Effects */
  .card:hover::before {
    height: 100%;
  }

  .card:hover .image {
    transform: scale(1.2); /* keep circle round */
  }

  .button:hover {
    background-color: #ec9c12ff;
    transform: scale(1.05);
  }
  .card-content h2 {
    font-size: 1.2rem;
    margin: 0 0 10px;
    color: #fff; /* white for contrast */
  }

  .card-content p {
    margin: 0 0 15px;
    color: #f0f0f0; /* light grey */
  }
`;

export default Card;
