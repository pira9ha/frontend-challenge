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
  }

  main {
    margin: 0 62px;
    text-align: center;
  }
`;
