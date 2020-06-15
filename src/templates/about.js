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
//grid
import { Row, Col } from 'styled-bootstrap-grid';

//styled
const AboutWrap = styled.section`
  position: relative;
  padding-top: ${rem('100px')};
  padding-bottom: ${rem('100px')};
  ${Heading} {
    text-align: center;
    margin-bottom: 60px;
  }
`;

const AboutPeople = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  li {
    text-align: center;
    min-width: 25%;
    width: 25%;
    margin-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
    img {
      display: block;
      margin-bottom: 10px;
      width: 100px;
      height: 100px;
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
    }
    h3 {
      margin-bottom: 0;
      font-size: ${rem('18px')};
      font-weight: 500;
    }
    p {
      font-size: ${rem('14px')};
      opacity: 0.7;
    }
  }
`;

const AboutContent = styled.div`
  position: relative;
  p {
    font-size: ${rem('18px')};
    line-height: 1.6;
  }
`;

const About = ({ data:{ wordPress } }) => {

  return (
    <Layout>
      <SEO title={wordPress.page.title} />
      <AboutWrap>
        <Container>
          <Heading heading1>{wordPress.page.title}</Heading>
          <AboutPeople>
            {wordPress.page.aboutPage.aboutImages.map((item) => (
              <li key={item.id}>
                <img src={item.mediaItemUrl} alt={item.title}/>
              </li>
            ))}
          </AboutPeople>
          <AboutContent>
            <Row>
              <Col md={6}>
                {wordPress.page.aboutPage.aboutText1}
              </Col>
              <Col md={6}>
                {wordPress.page.aboutPage.aboutText2}
              </Col>
            </Row>
          </AboutContent>
        </Container>
      </AboutWrap>
    </Layout>
  );
};

//query
export const query = graphql`
  query AboutQuery($id: ID!) {
    wordPress {
      page(id: $id) {
        id
        title
        slug
        content
        aboutPage {
          aboutText1
          aboutText2
          aboutImages {
            id
            mediaItemUrl
            title
          }
        }
      }
    }
  }
`;

export default About;