import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
`;

export const Task = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;

  p {
    margin: 0.3rem 0;
  }
`;

export const Button = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #A3C520;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8FB41A;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Loading = styled.p`
  text-align: center;
  color: #888;
`;

// Container for the generated rule
export const RuleContainer = styled.div`
  background: #e0f7fa;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
  margin-top: 1rem;
  width: 100%;
`;

export const RuleTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

export const Rule = styled.p`
  color: #555;
`;

export const Error = styled.p`
  color: red;
  text-align: center;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
`;

// Accept Button: styled with a green background, indicating positive action.
export const AcceptButton = styled.button`
  background-color: #A3C520;
  color: #fff;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

// Decline Button: styled with a red background, indicating negative or skip action.
export const DeclineButton = styled.button`
  background-color: #f44336; /* Red */
  color: #fff;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;