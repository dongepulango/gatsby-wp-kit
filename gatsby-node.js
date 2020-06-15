const path = require(`path`);

// //absolute import
exports.onCreateWebpackConfig = ({ getConfig, stage, actions }) => {
  const config = getConfig();
  if (stage.startsWith("develop") && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-dom": "@hot-loader/react-dom"
    };
  };
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

// Create Pages
exports.createPages = ({ graphql, actions }) => {

  const { createPage } = actions;

  camelize = function camelize(str) {
    return str.replace(/\W+(.)/g, function (match, chr) {
      return chr.toUpperCase();
    });
  };

  return graphql(`
    query PagesQuery {
      wordPress {
        pages {
          edges {
            node {
              id
              slug
            }
          }
        }
        posts {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    result.data.wordPress.pages.edges.forEach(({node}) => {
      createPage({
        path: node.slug === "home" ? '/' : node.slug,
        component: path.resolve('./src/templates/'+camelize(node.slug)+'.js'),
        context: {
          id: node.id,
        },
      })
    });
    
    result.data.wordPress.posts.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve('./src/templates/post.js'),
        context: {
          id: node.id,
        },
      })
    });
    
  });

};

// Remote files
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.createResolvers = (
  {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  },
) => {
  const { createNode } = actions
  createResolvers({
    WordPress_MediaItem: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.sourceUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
};