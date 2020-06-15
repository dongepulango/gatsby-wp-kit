import React from 'react';
//gatsby
import { graphql } from 'gatsby';
//styles
import styled from 'styled-components';
import { rem } from 'polished';
//components
import SEO from 'components/utils/seo';
import Layout from 'components/ui/layout';
import Container from 'components/ui/container';
import Heading from 'components/ui/heading';

//styled
const ContactWrap = styled.section`
  position: relative;
  padding-top: ${rem('100px')};
  padding-bottom: ${rem('100px')};
`;

const ContactContent = styled.div`
  position: relative;
  p {
    font-size: ${rem('18px')};
    line-height: 1.6;
  }
`;

const Contact = ({ data: { wordPress } }) => {
  return (
    <Layout>
      <SEO title={wordPress.page.title} />
      <ContactWrap>
        <Container>
          <Heading heading1>{wordPress.page.title}</Heading>
          <ContactContent dangerouslySetInnerHTML={{ __html: wordPress.page.contactPage.contactTexts }} />
        </Container>
      </ContactWrap>
    </Layout>
  );
};

//query
export const query = graphql`
  query ContactQuery($id: ID!) {
    wordPress {
      page(id: $id) {
        id
        title
        slug
        contactPage {
          contactTexts
        }
      }
    }
  }
`;

export default Contact;