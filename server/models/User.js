const mongoose = require("mongoose");
const validator = require("validator");
const { hash, compare } = require("bcryptjs");

const userSchema = mongoose.Schema({
  /*name: {
    type: String,
    required: [true, "The name is required!!"], //tnjm tkoun [] 3al5tr mongoose ya9ra table list
    minlength: 3,
    maxlength: 20,
  },*/
  email: {
    type: String,
    required: [true, "The email is required!!"],
    unique: true,
    validate: [validator.isEmail, "The email is not valid !!"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "The password is required!!"],
    minlength: 8,
    //validate : validator.isStrongPassword
  },
  passwordConfirm: {
    type: String,
    required: [true, "The password confirm is required!!"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "Pass and cPass does not match !!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"], //dictionnaire
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  pass_changed_at: {
    type: Date,
    default: Date.now(),
  },
});

// Encrypt password before saving

//mieddleware to check if the password is modified or not
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
 // this.password = await bcrypt.hash(this.password, 12); //salt key: 9adch bch t3ml hashage men mara 
  this.password = await hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.isPassCorrect = async function (pass, hPass) {
  return await compare(pass, hPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
