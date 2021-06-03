const express = require('express');
const app = express();
const PORT = 8081;
const api = require('./api');

app.use(api);

app.listen(PORT, () => {
   console.log(`Main Local Server running at : http://localhost:${PORT}`);
});