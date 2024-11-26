const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MerchantSchema = new Schema({
  name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
},
phoneNumber: {
    type: String,
    required: true,
},
birthDate: {
    type: String,
    required: false,
},
address: {
    type: String,
 
},
signupPath: {
    type: String,
},
influenceType: {
    type: String,
    required: true,
},
businessName: {
    type: String,
    required: true,
},
address : {
    type: String,
},
  signupPath: {
    type: String,
    required: true,
},
businessName: {
    type: String,
    required: true, 
},
textField1: {
    type: String,
    required: false,
},
textField2: {
    type: String,
    required: false,
},
textField3: {
    type: String,
    required: false,
}
  // merchant 모델
  
});
const MerchantModel = mongoose.model("merchants", MerchantSchema);
module.exports = MerchantModel;