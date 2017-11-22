const contentful = require('contentful');

const SPACE_ID = '7wtjz8qh7dke';
const ACCESS_TOKEN =
  '86c0d1e0a8c9867ba8dc67ea35d9822aa666977382600aa8c43d007b60dbdad7';

export default contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});
