import { response, request} from "express";
import Enterprise from './enterprise.model.js';

export const enterprisesGet = async (req = request, res = response) => {
    const {limit, from, sortBy} = req.query;
    const query = {state: true};
    let sort
    if(sortBy == 'AZ'){
        sort = {name: 1}
    }
    if(sortBy == 'ZA'){
        sort = {name: -1}
    }
    if(sortBy == 'YEARS'){
        sort = {yearsInMarket: 1}
    }
    const [total, enterprises] = await Promise.all([
        Enterprise.countDocuments(query),
        Enterprise.find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .sort(sort)
    ]);

    res.status(200).json({
        total,
        enterprises
    })
}

export const enterprisesPost = async (req, res) =>{
    const {name, description, country, enterpriseCategory, impactLevel, yearsInMarket} = req.body;
    const enterprise = new Enterprise({name, description, country, enterpriseCategory, impactLevel, yearsInMarket});

    await enterprise.save();

    res.status(200).json({
        enterprise
    });
}