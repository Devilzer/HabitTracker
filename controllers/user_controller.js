const User = require("../models/user");
const Habit = require("../models/habit");
const store = require("store");
const moment = require("moment");

    let carddates =[];
    carddates.push(moment().format("DD-MMM-YYYY"));
    carddates.push(moment().subtract(1,'day').format("DD-MMM-YYYY"));
    carddates.push(moment().subtract(2,'day').format("DD-MMM-YYYY"));
    carddates.push(moment().subtract(3,'day').format("DD-MMM-YYYY"));
    carddates.push(moment().subtract(4,'day').format("DD-MMM-YYYY"));
    carddates.push(moment().subtract(5,'day').format("DD-MMM-YYYY"));
    carddates.push(moment().subtract(6,'day').format("DD-MMM-YYYY"));

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
    
    console.log(carddates);
    const habits =await Habit.find({userEmail:req.body.email});
    for(let i of habits){
        i.streak = i.doneDays.length;
        i.save();
    }
    console.log(habits);
    const user =await User.findOne({email:req.body.email});
    const localuser = {
        username: user.username,
        email:user.email,
    };
    store.set("user",localuser);
    // res.locals.luser = localuser;
    return res.render("dashboard",{localuser,habits,carddates});
} catch (error) {
    console.log("Error in signing user",error);
    
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
        return res.render("dashboard",{localuser,habits,carddates});
        
    } catch (error) {
        console.log("error in creating habit",error);
    }
};

//function to update habit status
module.exports.updateHabitStatus = async(req,res)=>{
    try {
        const localuser = store.get("user");
        const habit =await Habit.findOne({habit:req.params.habit});
        
        if(habit.doneDays.includes(req.params.date)){
            for(let i=0 ; i <habit.doneDays.length ; i++){
                if(habit.doneDays[i]===req.params.date){
                    habit.doneDays.splice(i, 1);
                }
            }
        }else{
            habit.doneDays.push(req.params.date);
        }
        habit.streak = habit.doneDays.length;
        await habit.save();
        const habits =await Habit.find({userEmail:localuser.email});
        console.log("habit Staus Updated");
        return res.render("dashboard",{localuser,habits,carddates});
    } catch (error) {
        console.log("error in updating habit status",error);
    }
};

// habit delete function
module.exports.deleteHabit = async (req,res)=>{
    try {
        const localuser = store.get("user");
       habit = await Habit.findByIdAndDelete(req.params.id);
       console.log("habit deleted!");
       const habits =await Habit.find({userEmail:localuser.email});
       return res.render("dashboard",{localuser,habits,carddates});      
    } catch (error) {
        console.log("error in deleting habit",error);
    }
};

