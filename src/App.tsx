import Footer from "@components/Footer";
import Header from "@components/Header";
import Home from "@pages/Home";
import { darkmode } from "@utils/atom";
import GlobalStyled from "@utils/GlobalStyled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@utils/theme";

const RichaeWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background 0.25s;
  padding: 0 1.2rem;

  a {
    color: ${(props) => props.theme.color};
  }
`;

function App() {
  const darkmodeState = useRecoilValue(darkmode);
  return (
    <>
      <ThemeProvider theme={!darkmodeState ? lightTheme : darkTheme}>
        <BrowserRouter>
          <RichaeWrapper>
            <GlobalStyled />
            <div />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </RichaeWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
