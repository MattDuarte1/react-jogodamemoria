import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-20%) translateY(-50%);
  animation: surgimento 1s ease-in;

  @keyframes surgimento {
    from {
      top: 0px;
    }
    to {
      top: 50%;
    }
  }

  @media (max-width: 750px) {
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);

    flex-direction: column;

    h1 {
      font-size: 18px;
      margin-top: 20px;
    }
  }

  @media (max-width: 411px) {
    h1 {
      font-size: 15px;
    }
  }

  h1 {
    margin-left: 20px;
    color: black;
  }
`;
