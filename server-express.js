
// 20.3. Respondendo requisições com Node.js e Express
// despues de lanzar -->ng build --configuration=production, lanzar -->node server-express.js

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/larosproject-ui'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/larosproject-ui/index.html');
});

// app.listen(4200);
app.listen(process.env.PORT || 4200);
