const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const app = express();

const PORT = 4000;

app.use(morgan('combined'));//use in finding log for(req)

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,//max 5 request in 2 minutes->after that too many request try again later
	max: 5, 
})

app.use(morgan('combined'));
app.use(limiter);
//authentication is done than we can move to booking service for book the flight_ticket by next()
app.use('/bookingservice', async (req, res, next) => {
    console.log(req.headers['x-access-token']);//from auth_cont
    try {
        const response = await axios.get('http://localhost:3002/api/v1/isAuthenticated', {
            headers: {
                'x-access-token': req.headers['x-access-token']
            }
        });
        console.log(response.data);
        if(response.data.success) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorised'
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorised'
        })
    }
})
app.use('/bookingservice', createProxyMiddleware({ target: 'http://localhost:3003/', changeOrigin: true}));
app.get('/home', (req, res) => {
    return res.json({message: 'OK'});
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});