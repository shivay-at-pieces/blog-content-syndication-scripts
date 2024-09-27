const fs = require('fs');
const YAML = require('yaml');

const markdownFile = 'samples/100.impact-of-working-with-twitter-bootstrap-v5.md';


const markdown = fs.readFileSync(markdownFile, 'utf8');

// Split markdown into frontmatter and content
const parts = markdown.split('---');
const frontmatter = parts[1];
const contentMarkdown = parts[2];

// Get title from frontmatter
const frontmatterObject = YAML.parse(frontmatter);
const title = frontmatterObject.title;


// Keep original markdown
const originalMarkdown = contentMarkdown;

// Update markdown images 
const updatedMarkdown = originalMarkdown.replace(/\[(.*?)\]\((.*?)\)/g, (match, text, src) => {
    return `![${text}](${src})`;
});
const { GraphQLClient, gql } = require('graphql-request');

const HASHNODE_TOKEN = '';

const graphQLClient = new GraphQLClient('https://api.hashnode.com', {
    headers: {
        Authorization: HASHNODE_TOKEN
    },
});

async function publishArticle() {
    const query = gql`
  mutation CreateStory($input: CreateStoryInput!) {
    createStory(input: $input) {
      code
      success
      message
      post {
        _id 
      }
    }
  }
`;

    const variables = {
        input: {
            title: title,
            contentMarkdown: updatedMarkdown,
            isPartOfPublication: {
                publicationId: ""
            },
            tags: [
                { _id: 'tech', name: 'tech' },
                { _id: 'javascript', name: 'javascript' }
            ]
        }
    };

    const data = await graphQLClient.request(query, variables);

    console.log(data);
}

publishArticle();