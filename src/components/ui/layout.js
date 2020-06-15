import React from 'react';
//router
import { useLocation } from '@reach/router';
//style
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'components/styles/reset';
import typography from 'components/styles/typography';
//page transition
import PageTransition from 'components/ui/pageTransition';
//components
import Header from "components/ui/header";
import Footer from "components/ui/footer";
//framer-motion
import { AnimatePresence } from 'framer-motion';

//Reset & Default Styles
const GlobalStyle = createGlobalStyle`
  ${reset};
  ${typography};
`;

//styled
const LayoutWrap = styled.div`
  position: relative;
  overflow: hidden;
`;

//styled
const Main = styled.main`
  position: relative;
  min-height: 100vh;
`;

const Layout = ({ children }) => {

  //location
  const location = useLocation();

  return (
    <LayoutWrap>
      <GlobalStyle />
      <Header />
      <Main>
        <AnimatePresence exitBeforeEnter>
          <PageTransition location={location.pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </Main>
      <Footer />
    </LayoutWrap>
  );
};

export default Layout;