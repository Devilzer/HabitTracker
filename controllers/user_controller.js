module.exports.start = (req,res)=>{
    return res.render("startpage");
};

module.exports.signup = (req,res)=>{
    return res.render("signup");
};

module.exports.createUser = (req,res)=>{
console.log(req.body);
return res.render("dashboard");
};