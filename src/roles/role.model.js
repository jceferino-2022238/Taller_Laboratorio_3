import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    role:{
        type: String,
        required: [true, 'The role isnt optional']
    }
});

export default mongoose.model('Role', RoleSchema);