const mongoose = require("mongoose");
const habitSchema = mongoose.Schema({
    habit : {
        type : String,
        required : true,
    },
    userEmail:{
        type : String,
        required : true,
    },
    streak:{
        type: Number,
    },
    doneDays:{
        type : Array,
    }
});

const Habit = mongoose.model("Habit",habitSchema);

module.exports = Habit;