import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font-family: 'Roboto', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.25px;
    box-sizing: border-box;
    line-height: normal;
    margin: 0;
    transition: all 0.3s ease;
  }

  main {
    margin: 0 62px;
    text-align: center;
  }
`;

export const theme = {
  basicBlue: '#2196F3',
  background: 'white',
  inactiveLink: 'rgba(255, 255, 255, 0.7)',
  activeNav: '#1E88E5',
};
