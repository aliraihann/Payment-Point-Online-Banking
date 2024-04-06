const express = require('express');
const {createTableUsers} = require('./models/user');
const {createTableProfile} = require('./models/profile');
const {createTableBanners, insertMultiBanners, bannerValues} = require('./models/banner');
const {createTableService, insertMultiServices, serviceValues} = require('./models/service');
const {createTableTransactionHistory} = require('./models/transaction');

const userRoutes = require('./routes/userRoute');
const profileRoutes = require('./routes/profileRoute');
const bannerRoutes = require('./routes/bannerRoute');
const serviceRoutes = require('./routes/serviceRoute');
const transactionRoutes = require('./routes/transactionRoute');


const app = express();
const {json} = require('express')
app.use(json());

const port = process.env.PORT;

/*
initate new tables and values to the database:
createTableUsers();
createTableProfile();
createTableBanners();
insertMultiBanners(bannerValues);
createTableService();
insertMultiServices(serviceValues);
createTableTransactionHistory();
*/

app.use('/', userRoutes);
app.use('/', profileRoutes);
app.use('/', bannerRoutes);
app.use('/', serviceRoutes);
app.use('/', transactionRoutes);

app.listen(port, ()=>
    console.log(`app is listening on ${port}`)
)