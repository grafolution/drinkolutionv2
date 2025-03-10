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

export const Task = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #555;
  margin: 1rem 0;
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

export const Loading = styled.p`
  text-align: center;
  color: #888;
`;

export const RuleContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

