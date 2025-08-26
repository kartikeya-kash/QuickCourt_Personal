import React from "react";
import styled from "styled-components";

const Button = ({ text, onClick }) => {
  return (
    <StyledWrapper>
      <div
        aria-label="User Login Button"
        tabIndex={0}
        role="button"
        className="user-profile"
        onClick={onClick}
      >
        <div className="user-profile-inner">
          <p>{text}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .user-profile {
    width: 131px;
    height: 51px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s ease;
    background: linear-gradient(
      to bottom right,
      #2e8eff 0%,
      rgba(46, 142, 255, 0) 30%
    );
    background-color: rgba(46, 142, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-profile:hover,
  .user-profile:focus {
    background-color: rgba(46, 142, 255, 0.7);
    box-shadow: 0 0 10px rgba(46, 142, 255, 0.5);
    outline: none;
  }

  .user-profile-inner {
    width: 127px;
    height: 47px;
    border-radius: 13px;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    color: #fff;
    font-weight: 600;
  }

  .user-profile-inner svg {
    width: 27px;
    height: 27px;
    fill: #fff;
  }
`;

export default Button;
