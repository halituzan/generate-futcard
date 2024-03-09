import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Adınızı girmeniz gerekiyor."],
  },
  userName: {
    type: String,
    unique: true,
    required: [true, "Adınızı girmeniz gerekiyor."],
  },
  lastName: {
    type: String,
    required: [true, "Soy adınızı girmeniz gerekiyor."],
  },
  email: {
    type: String,
    required: [true, "Email girmeniz gerekiyor"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Şifre girmeniz gerekiyor"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
