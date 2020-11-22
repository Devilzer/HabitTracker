const User = require("../models/user");
const Habit = require("../models/habit");
const store = require("store");
module.exports.start = (req,res)=>{
    return res.render("startpage");
};

module.exports.signup = (req,res)=>{
    return res.render("signup");
};

//signup function
module.exports.createUser = async(req,res)=>{
try {
    const user = new User(req.body);
    await user.save();
    console.log("User Created!!!")
    return res.render("/");
    
} catch (error) {
    console.log("Error in creating user ",error);
}
// console.log(localuser);

};


//signin function
module.exports.signinUser = async(req,res)=>{
try {
    const habits =await Habit.find({userEmail:req.body.email});
    console.log(habits);
    const user =await User.findOne({email:req.body.email});
    const localuser = {
        username: user.username,
        email:user.email,
    };
    store.set("user",localuser);
    // res.locals.luser = localuser;
    return res.render("dashboard",{localuser,habits});
} catch (error) {
    console.log("Error in signing user",error);
    return res.redirect("back");
}
};

//function for adding habits..
module.exports.createHabit = async(req,res)=>{
    try {
        const localuser = store.get("user");
        const habittemp = {
            habit: req.body.habit,
            userEmail : localuser.email,
            streak:0,
            doneDays:[],
        };

        const habit = new Habit(habittemp);
        await habit.save();
        const habits =await Habit.find({userEmail:localuser.email});
        console.log("Habit Regstered!!!");
    return res.render('dashboard',{localuser,habits});
        
    } catch (error) {
        console.log("error in creating habit",error);
    }
    
}

// module.exports.home = (req,res)=>{
//     console.log(res.locals);
//    return res.render("dashboard");
// };