const express = require('express');
const { DatabaseConnection } = require('./db/connection');
const { StudentsModel } = require('./models/students');
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
// Database connection Start
DatabaseConnection();
// Database connection End

app.post('/new', async (req, res) => {
    try {
        const user = new StudentsModel(req.body);
        user.save().then(data => res.send(data)).catch(err => res.send(err));
    } catch (error) {
        res.status(404).send(error);
    }
});
app.patch('/minUpdate/:id',async(req,res) => {
    try {
        const userUpdate = await StudentsModel.updateOne({_id : req.params.id},req.body);
        res.send({
            success : true,
            userUpdate
        });
    } catch (error) {
        res.send(error);
    }
});
app.get('/', async (req, res) => {
    try {
        const AllUsers = await StudentsModel.find();
        res.status(200).send(AllUsers);
    } catch (error) {
        res.send(error);
    }
});
app.put('/maxUpdate/:id', async (req,res) => {
    try {
        await StudentsModel.updateOne({_id : req.params.id},req.body).then(data => res.send({
          success : true,
          data  
        })).catch(err => res.sendd({
            success : false,
            err
        }));
    } catch (error) {
        res.send(error);
    }
});
app.get('/:id', async (req, res) => {
    try {
        await StudentsModel.findOne({_id : req.params.id}).then(data => res.send(data)).catch(err => res.send(err))
    } catch (error) {
        res.send(error);
    }
});
app.delete('/remove/:id',async (req,res) => {
    try {
        await StudentsModel.deleteOne({_id : req.params.id})
        res.status(201).send({
            success: true,
            message : "Student Detail was deleted successfully"
        });
    } catch (error) {
        res.status(404).send({
            success: true,
            message : error
        });
    }
});
// application are listening no port number 3000
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});