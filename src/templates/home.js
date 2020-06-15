import React from 'react';
//gatsby
import { Link, graphql } from 'gatsby';
//styles
import styled from 'styled-components';
import { rem } from 'polished';
//components
import SEO from 'components/utils/seo';
import Layout from 'components/ui/layout';
import Container from 'components/ui/container';
// import Image from 'components/ui/image';
import Heading from 'components/ui/heading';
import Button from 'components/ui/button';
//grid
import { Row, Col } from 'styled-bootstrap-grid';

//styled
const HomeWrap = styled.section`
  position: relative;
`;

const HomeHero = styled.div`
  position: relative;
  padding-top: ${rem('150px')};
  padding-bottom: ${rem('150px')};
  border-bottom: 1px solid #f6edfa;
  border-top: 1px solid #f6edfa;
  background: #fcfaff;
  text-align: center;
  .image-wrap {
    margin-bottom: 40px;
    img {
      max-width: 100px;
      height: auto;
    }
  }
  ${Heading} {
    font-weight: bold;
    margin-bottom: 15px;
  }
  p {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const HomeContent = styled.div`
  position: relative;
  padding-top: ${rem('100px')};
  padding-bottom: ${rem('100px')};
  img {
    max-width: 400px;
    height: auto;
  }
`;

const Home = ({ data: { wordPress, site } }) => {
  return (
    <Layout>
      <SEO title={wordPress.page.title} />
      <HomeWrap>
        <HomeHero>
          <Container>
            <div className="image-wrap">
              <img src={wordPress.page.homePage.homeIcon.mediaItemUrl} alt="Icon"/>
            </div>
            <Heading heading1>{site.siteMetadata.title}</Heading>
            <p>{site.siteMetadata.description}</p>
          </Container>
        </HomeHero>
        <HomeContent>
          <Container>
            <Row>
              <Col md={6}>
                <img src={wordPress.page.homePage.homeImage.mediaItemUrl} alt="Icon" />
              </Col>
              <Col md={6}>
                <div dangerouslySetInnerHTML={{ __html: wordPress.page.homePage.homeText }}></div>
                <br />
                <Link to="/blog">
                  <Button primary>Visit Blog</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </HomeContent>
      </HomeWrap>
    </Layout>
  );
};

//query
export const query = graphql`
  query HomeQuery($id: ID!) {
    wordPress {
      page(id: $id) {
        id
        title
        slug
        homePage {
          homeIcon {
            mediaItemUrl
          }
          homeImage {
            mediaItemUrl
          }
          homeText
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default Home;