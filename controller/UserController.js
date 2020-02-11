const users = require('../models/Users');

module.exports = {
    getAllUsers: (req, res) => {
        res.json(users);
    },
    register: (req,res) => {
        return new Promise((resolve, reject) => {
            const {name, email, password } = req.body; 
    
            if(req.body.name.length===0 || req.body.email.length ===0 || req.body.password.length ===0 ){
                return res.json({ message: 'All fields must be completed'})
            }

            User.findOne({email:req.body.email}).then(user =>{
                if(user) {
                    return res.status(403).json({message: 'User Already There'});
                }
                const newUser = new User();
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
    
                newUser.name = name;
                newUser.email = email;
                newUser.password = hash;
                newUser.save().then(user => {
                    res.status(200).json({message : 'User Created', user});
                })
                .catch(err=> {
                    reject(err);
                });
            });
        });
    },
    login: (req, res) => {
        return new Promise((resolve, reject) => {
            User.findOne({email:req.body.email}).then((user) => {
    
                bcrypt.compare(req.body.password, user.password).then(user => {
                    return res.send(
                        user === true ? 'You are now logged in': "incorrect credentials"
                    );
                })
                .catch(err => {
                    res.status(500).json({ message: 'Server error', err}
                    );
                })
            })
            .catch(err => reject(err));
        });
    },
    update: (req,res) => {
        return new Promise((resolve, reject) => {
            User.findById(req.params.id).then((user) => {
                const { name, email} = req.body;
                user.name = req.body.name ? req.body.name : user.name
                user.email = req.body.email ? req.body.email : user.email;
                user.save().then((user) => {
                    return res.status(200).json({ message: 'User Updated', user});
                })
                .catch(err => reject(err));
            })
            .catch(err => res.status(500).json({ message: 'Server Error', err}));
        })
    },
    delete: (req, res) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndDelete({ _id: req.params.id}).then( user => {
                return res.status(200).json({message: 'User Deleted', user});
            })
            .catch(err => res.status(400).json({ message: 'No User To Delete', user}));
        });
    }
};