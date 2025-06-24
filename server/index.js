const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require("./models/Users")

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/crud')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get("/getUsers", (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndDelete({_id : id})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
    const { id } = req.params;

    UserModel.findById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});



app.post("/createUser", (req, res) => {
    UserModel.create(req.body).then(users => res.json(users)).catch(err => res.json(err))
})
app.post("/updateUser/:id", (req, res) => {
    const { id } = req.params;

    UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }));
});



app.listen(3000, () => console.log('Server started'));

