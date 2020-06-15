import React from 'react';
//styles
import styled from 'styled-components';
import { rem } from 'polished';
import vars from 'components/styles/varss';
//components
import Container from 'components/ui/container';

//styled
const FooterWrap = styled.footer`
  position: relative;
  border-top: 1px solid #f6edfa;
  padding-top: ${rem('30px')};
  padding-bottom: ${rem('30px')};
  text-align: center;
  color: ${vars.colors.textLight};
  font-size: ${rem('14px')};
`;

const Footer = (props) => {
  return (
    <FooterWrap>
      <Container>
        <p>&copy; Copyright {new Date().getFullYear()}</p>
      </Container>
    </FooterWrap>
  );
};

export default Footer;