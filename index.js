const express = require('express');
const app = express();
const localeMetadata = require('./utils/localeMetadata');

// Define the public folder
const publicPath = '/res';
// Serve static files from the public folder using the custom path
app.use(publicPath, express.static('res'));

app.set('view engine', 'ejs'); // Set the template engine to EJS
app.get('/', (req, res) => {
    const data = localeMetadata.getMetadataByLocale(req.query.locale);
  
    res.render('index', { data, locales: localeMetadata.getLocales() });
});

app.get('/metadata', (req, res) => {
    return res.json(localeMetadata.getMetadataByLocale(req.query.locale).metadata);
    
});
app.get('/apps', (req, res) => {
  return res.json(localeMetadata.getMetadataByLocale(req.query.locale).metadata.apps);
  
});

// Start the server
app.listen(2024, () => {
  console.log('Server listening on port 2024');
});