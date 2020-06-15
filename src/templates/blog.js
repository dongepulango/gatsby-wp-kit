import React from 'react';
//gatsby
import { graphql, Link } from 'gatsby';
//styles
import styled from 'styled-components';
import vars from 'components/styles/varss';
import { rem } from 'polished';
//components
import SEO from 'components/utils/seo';
import Layout from 'components/ui/layout';
import Container from 'components/ui/container';
import Heading from 'components/ui/heading';
import Archive from 'components/blog/archive';
//moment
import Moment from 'react-moment';
//grid
import { Row, Col } from 'styled-bootstrap-grid';

//styled
const BlogWrap = styled.section`
  position: relative;
  padding-top: ${rem('100px')};
  padding-bottom: ${rem('100px')};
  h1 {
    margin-bottom: 50px;
  }
`;

const BlogContent = styled.div`
  position: relative;
`;

const BlogPost = styled.div`
  margin-bottom: 60px;
  .heading-link {
    display: block;
    h2 {
      margin-bottom: 5px;
      transition: ${vars.transitions.hover1};
      &:hover {
        color: rebeccapurple;
      }
    }
  }
  .date {
    color: #999;
    margin-bottom: 15px;
  }
  .read-more {
    display: inline-block;
    margin-top: 20px;
    color: rebeccapurple;
    border-bottom: 1px solid rebeccapurple;
  }
`;

const Blog = ({ data: { wordPress } }) => {

  return (
    <Layout>
      <SEO title={wordPress.page.title} />
      <BlogWrap>
        <Container>
          <Heading as="h1" heading1>{wordPress.page.title} Posts</Heading>
          <Row>
            <Col md={8}>
              <BlogContent>
                {wordPress.posts.edges.map((post) => (
                  <BlogPost key={post.node.id}>
                    <Link to={'../' + post.node.slug} className="heading-link">
                      <Heading as="h2" heading3>{post.node.title}</Heading>
                    </Link>
                    <p className="date">
                      <Moment format="MMMM DD, YYYY" withTitle>
                        {post.node.date}
                      </Moment>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: post.node.content.substring(0, 400) + '...' }}></div>
                    <Link to={'../' + post.node.slug} className="read-more">Read More</Link>
                  </BlogPost>
                ))}
              </BlogContent>
            </Col>
            <Col md={4}>
              <Archive />
            </Col>
          </Row>
        </Container>
      </BlogWrap>
    </Layout>
  );
};

//query
export const query = graphql`
  query BlogQuery($id: ID!) {
    wordPress {
      page(id: $id) {
        id
        title
        slug
      }
      posts {
        edges {
          node {
            id
            slug
            title
            date
            content
          }
        }
      }
    }
  }
`;

export default Blog;