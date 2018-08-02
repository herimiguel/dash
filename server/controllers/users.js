var mongoose = require('mongoose'); 
var User = mongoose.model('User');

module.exports = {
    give: function(req, res) {
       User.find({}, function(err, users){
           if(err){
               console.log("There is an Error loading users");
           } else{
               res.json(users)
           }
       }); 
    },

    create: function(req, res){
        console.log(req.body);
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.save(function(err){
            if(err){
                console.log(err);
                res.json(newUser);
            }else{
                console.log(newUser);
                res.json(newUser);
            }
        });
    },


    login: function(req, res){
        var findEmail = req.body.email;
        console.log(findEmail);
        User.findOne({email: findEmail}, function(err, user){  
         if(err){
         } else{
             req.session.current_user = user;
             console.log(user);
             res.json(user);
         }
        });
    },

    
    current: function(req,res){
        console.log("current function");
        console.log(req.session.current_user);
        res.json(req.session.current_user);
    },

    logout: function(req,res){
        req.session.current_user = {};
        res.json([]);
    }

}



    //    user.save(function(err) { 
    //        if(err) {
    //             res.json(err);
    //         } else {
    //             res.json(bike);
    //         }
    //     });
    // },

//    read: function(req, res) {
//         Bike.find({}, function(err, bike) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.json(bike);
//             }
//         });
//     },

//    destroy: function(req, res) {
//         Bike.findOne({ _id: req.params.id }).remove(function(err, cancelled) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.json(cancelled);
//             }
//         });
//     }
// };