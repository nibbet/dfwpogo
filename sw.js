
// Change this to your repository name
var GHPATH = '/dfwpogo';

// Choose a different app prefix name
var APP_PREFIX = 'dfwpogo_';

// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_01';

// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/styles.css`,
  `${GHPATH}/js/app.js`,
  `${GHPATH}/img/1.jpeg`,
  `${GHPATH}/img/2.jpeg`,
  `${GHPATH}/img/3.jpeg`,
  `${GHPATH}/img/4.jpeg`
]