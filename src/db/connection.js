const mongoose = require("mongoose");

const DatabaseConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/StudentApi').then(() => {
        console.log('Connect To Database');
    }).catch(err => console.log('Database Connection Not Established'));
};

module.exports =  {DatabaseConnection}

