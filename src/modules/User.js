import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'

const schema =new mongoose.Schema(
  {
      email:{type:String, required:true,lowercase:true, index:true,unique:true},
      passwordHash:{type:String, required:true},
      confirmed:{type:Boolean, default:false},
      confirmationToken:{type:String,default:""}
  },
  {timestamps:true}

);

schema.methods.isValidPassword= function isValidPassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.generateJWT=function generateJWT(){

  return  jwt.sign({
    email: this.email,
    confirmed:this.confirmed
  },"secretkey");
};

schema.methods.toAuthJSON= function toAuthJSON(){
  return {
    email:this.email,
    confirmed:this.confirmed,
    token:this.generateJWT()
  }
};

schema.methods.setPssword=function setPssword(password){
  this.passwordHash=bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken=function setConfirmationToken(){
  this.confirmationToken=this.generateJWT();
};

schema.methods.generateConfirmationUrl=function generateConfirmationUrl(){
  return `http://localhost:3000/confirmation/${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink(){
      return `http://localhost:3000/reset_password/${this.generateResetPasswordToken()}`;
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    "secertkey",
    { expiresIn: "1h" }
  );
};

schema.plugin(uniqueValidator,{message:'This email is already taken'});

export default mongoose.model('User',schema,'user')
