const express = require('express');
const apps = express();
const port = 8000;

// Set the view engine to EJS
apps.set('view engine', 'ejs');

// Set the views directory to the correct path
apps.set('views', '/home/toobler/Documents/test/demoNode/views');

apps.get('/', (req, res) => {
    res.render('pages/index');
});

apps.listen(port, () => {
    console.log(`apps listening at port ${port}`);
});
