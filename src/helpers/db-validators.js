import User from '../users/user.model.js'
import Enterprise from '../enterprises/enterprise.model.js'
export const exEmail = async (email = '') =>{
    const existsEmail = await User.findOne({email});
    if(existsEmail){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const eName = async (name = '') =>{
    const existsEName = await Enterprise.findOne({name});
    if(existsEName){
        throw new Error(`The enterprise with name ${name} is already registered`)
    }
}

export const exUserById = async (id = '') => {
    const existsUserById = await User.findById(id);
    if (!existsUserById){
        throw new Error(`Id ${email} doesnt exist`)
    }
}

export const exEById = async (id = '') =>{
    const existsEntById = await Enterprise.findById(id);
    if (!existsEntById){
        throw new Error(`Id ${name} doesnt exist`)
    }
}