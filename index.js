const express = require('express')
const app = express();
const logger = require('morgan')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('./models/Users')
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB Connected')
}).catch((err) => console.log(`Mongo Error: ${err}`));

const port = process.env.PORT || '3000';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);

// app.get('/getAllUsers', (req, res) => {
//     User.find({}).then(users => res.json(users));
// });

// app.post('/register', (req,res) => {
//     return new Promise((resolve, reject) => {
//         const {name, email, password } = req.body; 

//         // validate input
//         if(req.body.name.length===0 || req.body.email.length ===0 || req.body.password.length ===0 ){
//             return res.json({ message: 'All fields must be completed'})
//         }
//         // check if user exists
//         User.findOne({email:req.body.email}).then(user =>{
//             if(user) {
//                 return res.status(403).json({message: 'User Already There'});
//             }
//             const newUser = new User();
//             const salt = bcrypt.genSaltSync(10);
//             const hash = bcrypt.hashSync(req.body.password, salt);

//             newUser.name = name;
//             newUser.email = email;
//             newUser.password = hash;
//             newUser.save().then(user => {
//                 res.status(200).json({message : 'User Created', user});
//             })
//             .catch(err=> {
//                 reject(err);
//             });
//         });
//     });
// });

// app.post('/login', (req, res) => {
//     return new Promise((resolve, reject) => {
//         User.findOne({email:req.body.email}).then((user) => {

//             bcrypt.compare(req.body.password, user.password).then(user => {
//                 return res.send(
//                     user === true ? 'You are now logged in': "incorrect credentials"
//                 );
//             })
//             .catch(err => {
//                 res.status(500).json({ message: 'Server error', err}
//                 );
//             })
//             // const passwordMatch = user.password === req.body.password ? true : false;
//             // if(!passwordMatch) {
//             //     return res.status(400).json({ message: 'Incorrect email or password'});
//             // }else {
//             //     res.status(200).json({ message: `You are now logged in ${user.email}`});
//             //     resolve(user);
//             // }
//         })
//         .catch(err => reject(err));
//     });
// });

// app.put('/update/:id', (req,res) => {
//     return new Promise((resolve, reject) => {
//         User.findById(req.params.id).then((user) => {
//             const { name, email} = req.body;
//             user.name = req.body.name ? req.body.name : user.name
//             user.email = req.body.email ? req.body.email : user.email;
//             user.save().then((user) => {
//                 return res.status(200).json({ message: 'User Updated', user});
//             })
//             .catch(err => reject(err));
//         })
//         .catch(err => res.status(500).json({ message: 'Server Error', err}));
//     })
// });

// app.delete('/delete/:id', (req, res) => {
//     return new Promise((resolve, reject) => {
//         User.findByIdAndDelete({_id: req.params.id}).then( user => {
//             return res.status(200).json({message: 'User Deleted', user});
//         })
//         .catch(err => res.status(400).json({ message: 'No User To Delete', user}));
//     });
// });

app.listen(port, () => {
    console.log(`Listening on ${port}`)
}); 