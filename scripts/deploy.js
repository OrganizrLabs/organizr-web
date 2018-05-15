const ghpages = require('gh-pages');

ghpages.publish(
  'build',
  {
    branch: 'master',
  },
  () => {
    console.log('Completed deployment');
  },
);
