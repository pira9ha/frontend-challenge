import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font-family: Roboto, "sans-serif";
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.25px;
    box-sizing: border-box;
    line-height: normal;
  }
  
  main {
    margin: 0 62px;
    text-align: center;
    padding-bottom: 31px;
  }
`;
