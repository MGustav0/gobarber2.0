import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #312E38;
    color: #FFF;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font: "Roboto Slab", serif;
    font-size: 16px;
  }

  hanging-punctuation, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;