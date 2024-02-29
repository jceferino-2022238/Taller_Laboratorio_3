import mongoose from "mongoose";

const EnterpriseSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name isnt optional"]
    },
    description:{
        type: String,
        required: [true, "Description isnt optional"]
    },
    country:{
        type: String,
        required: [true, "The country where the enterprise was founded isnt optional"]
    },
    enterpriseCategory:{
        type: String,
        required: [true, "Enterprise category isnt opotional"]
    },
    impactLevel:{
        type: String,
        required: [true, "Impact level isnt optional"]
    },
    yearsInMarket:{
        type: String,
        required: [true, "Enterprise years in market arent optional"]
    },
    state:{
        type: Boolean,
        default: true
    }
});

EnterpriseSchema.methods.toJSON = function(){
    const {__v, _id, ...enterprise} = this.toObject();
    enterprise.eid = _id;
    return enterprise;
}

export default mongoose.model('Enterprise', EnterpriseSchema)