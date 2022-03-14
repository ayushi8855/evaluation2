// mongodb+srv://ayushi8855:<password>@cluster0.pmdxw.mongodb.net/test

const express= require("express")
const mongoose= require("mongoose")
const app=express()
app.use(express.json())

const connect =()=>{
    return mongoose.connect("mongodb+srv://ayushi8855:Ayujaman675@cluster0.lff3t.mongodb.net/test")
}


const userSchema=mongoose.Schema({
  firstName:{type:String,required:true},
  middleName:{type:String,required:true},
  lastName:{type:String,required:true},
  age:{type:Number,required:true},
  email:{type:String,required:true},
 address:{type:String,required:true},
gender:{type:String,required:true},
  type:{type:String,required:false,default:"customer"},
},
{
    versionKey:false,
    timestamps:true,
})


const User =mongoose.model("user",userSchema)


const branchdetail=mongoose.Schema({
    Name:{type:String,required:true},
   
    
   address:{type:String,required:true},
  IFSC:{type:Number,required:true},
    MICR:{type:Number,required:true,default:"customer"},
  },
  {
      versionKey:false,
      timestamps:true,
  })

  const Branch =mongoose.model("branch",branchdetail)


  const userdetaile=mongoose.Schema({
    accountNumber:{type:Number,required:true,unique:true}
  },
  {
      versionKey:false,
      timestamps:true,
  })
  
  
  const detaile =mongoose.model("branch",userdetaile)


  const fixedaccount=mongoose.Schema({
    accountNumber:{type:Number,required:true,unique:true},
   balance:{type:Number,required:true},
   interestrate:{type:Number,required:true},
   startdate:{type:Date,required:true},
   maturitydate:{type:Date,required:true},
   masterId:{type:mongoose.Schema.Types.ObjectId,
    ref:"master",
    required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true},
  },
  {
      versionKey:false,
      timestamps:true,
  })
  
  
  const Fixed =mongoose.model("fixed",fixedaccount)

const masterAccount=mongoose.Schema({
    balance:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true},
        branchId:{type:mongoose.Schema.Types.ObjectId,
            ref:"branch",
            required:true},
       
  },
  {
      versionKey:false,
      timestamps:true,
  })
  
  
  const Master =mongoose.model("master", masterAccount)

  const savingAccount=mongoose.Schema({
    account_number:{type:Number,required:true},
    balance:{type:Number,required:true},
    interestrate:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true},},
  {
      versionKey:false,
      timestamps:true,
  })
  
  
  const Saving =mongoose.model("saving", savingAccount)

//   user crud

app.get("/user",async(req,res)=>{
    try{
        const user=await User.find().lean().exec()
        return res.status(200).send(user)
    }
    catch(err){
  return res.status(500).send(err.message)
    }
})


app.post("/user",async(req,res)=>{
    try {
        const user =await User.create(req.body)
        return res.status(201).send(user)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})

app.get("/master",async(req,res)=>{
    try{
        const master=await Master.find().lean().exec()
        return res.status(200).send(master)
    }
    catch(err){
  return res.status(500).send(err.message)
    }
})
app.get("/master:id",async(req,res)=>{
    try{
        const master=await Master.findById(req.params.id).populate({path:"userdetaileId",select:["account_number","balance"]})
        return res.status(200).send(master)
    }
    catch(err){
  return res.status(500).send(err.message)
    }
})
app.get("/master:id",async(req,res)=>{
    try{
        const master=await Master.findById(req.params.id).populate({path:"userId"})
        return res.status(200).send(master)
    }
    catch(err){
  return res.status(500).send(err.message)
    }
})

app.post("/master",async(req,res)=>{
    try {
        const master =await Master.create(req.body)
        return res.status(201).send(master)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})

app.get("/fixed",async(req,res)=>{
    try{
        const fixed=await Fixed.find().lean().exec()
        return res.status(200).send(fixed)
    }
    catch(err){
  return res.status(500).send(err.message)
    }
})


app.post("/fixed",async(req,res)=>{
    try {
        const fixed =await Fixed.create(req.body)
        return res.status(201).send(fixed)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})
app.patch("/fixed:id",async(req,res)=>{
    try {
        const fixed =await Fixed.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(201).send(fixed)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})
app.delete("/fixed:id",async(req,res)=>{
    try {
        const fixed =await Fixed.findByIdAndDelete(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(201).send(fixed)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})
app.get("/saving",async(req,res)=>{
    try{
        const saving=await Saving.find().lean().exec()
        return res.status(200).send(saving)
    }
    catch(err){
  return res.status(500).send(err.message)
    }
})


app.post("/saving",async(req,res)=>{
    try {
        const saving =await Saving.create(req.body)
        return res.status(201).send(saving)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})
app.patch("/saving:id",async(req,res)=>{
    try {
        const saving =await Saving.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(201).send(saving)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})
app.get("/branch",async(req,res)=>{
    try{
        const branch=await Branch.find().lean().exec()
        return res.status(200).send(branch)
    }
    catch(err){
  return res.status(500).send(err.message)
    }
})


app.post("/branch",async(req,res)=>{
    try {
        const branch =await Branch.create(req.body)
        return res.status(201).send(branch)
    } catch (error) {
        return res.status(500).send(err.message)
    }
})




app.listen(4000,async()=>{
    try{
        await connect();
        console.log("listening to 4000")
    }
    catch(err){
        console.log(err)
    }
 })