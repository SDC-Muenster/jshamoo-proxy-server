require('newrelic');
require('dotenv').config();
let express = require('express');
let app = express();
let proxy = require('http-proxy-middleware');


app.use(proxy('/api/photos', {target: 'http://localhost:3333'}));
app.use(proxy('/house', {target: 'http://localhost:3005'}));
app.use(proxy('/api/houses', {target: 'http://localhost:3000'}));
app.use(proxy('/homes', { target: 'http://3.16.255.209:3022'}));
app.use(express.static('public'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Proxy server running on PORT ${PORT}`)
});
