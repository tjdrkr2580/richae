import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
        * {
            font-size: 10px;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Pretendard;
            text-decoration: none;
        }
        body {
            min-height: 100vh;
            min-width: 100vw;
        }
        button {
            padding: 0.4rem 0.8rem;
            border: 0;
        }
        input {
            padding: 0.4rem 0.8rem;
        }
    `;

const GlobalStyled = () => {
  return <Globalstyle />;
};

export default GlobalStyled;
