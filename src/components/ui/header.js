import React, { useContext, useRef, useEffect } from 'react';
//gatsby
import { Link } from 'gatsby';
//context
import { GlobalContext } from 'context/';
//styles
import styled, { css } from 'styled-components';
import { rgba, rem } from 'polished';
import vars from 'components/styles/varss';
//components
import Container from 'components/ui/container';
//headeroom
import Headroom from 'react-headroom';

//styled
const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  background-color: rebeccapurple;
  height: ${vars.headerHeight}px;
  position: relative;
  z-index: 9;
  transition: ${vars.transitions.hover1};
  @media (max-width: ${vars.media.smMax}) {
    height: ${vars.headerHeightSm}px;
  }
  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /* scrolled */
  ${props => props.scrolled && css`
    height: ${vars.headerHeightSm}px;
  `}
`;

const Logo = styled.div`
  position: relative;
  a {
    font-size: ${rem('24px')};
    display: block;
    color: #fff;
    font-weight: bold;
    line-height: 1;
    &:hover,
    &:focus,
    &:active {
      color: #fff;
    }
  }
  img {
    max-width: 60px;
    height: auto;
    margin-left: -10px;
  }
`;

const NavLinks = styled.nav`
  position: relative;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-right: -10px;
    li {
      a {
        display: block;
        padding: 5px 10px;
        color: ${rgba('#fff', 0.6)};
        &:hover,
        &:focus,
        &:active {
          color: #fff;
        }
        /* current page */
        &[aria-current='page'] {
          color: #fff;
        }
      }
    }
  }
`;

const Header = () => {

  //use Context
  const [context, setContext] = useContext(GlobalContext);

  let browserWindow = {}
  if (typeof window !== 'undefined') {
    browserWindow = window;
  }

  //set header scrolled
  const setHeaderScrolled = (state) => {
    setContext({
      ...context,
      headerScrolled: state,
    });
  };

  //scroll Y ref
  const prevScrollY = useRef(0);

  //scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = browserWindow.scrollY;
      if (currentScrollY > vars.headerHeight) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
      prevScrollY.current = currentScrollY;
    };
    browserWindow.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      browserWindow.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Headroom>
      <HeaderWrap scrolled={context.headerScrolled}>
        <Container maxWidth="1920px">
          <Logo>
            <Link to="/">Gatsby + Wordpress</Link>
          </Logo>
          <NavLinks>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </NavLinks>
        </Container>
      </HeaderWrap>
    </Headroom>
  );
};

export default Header;