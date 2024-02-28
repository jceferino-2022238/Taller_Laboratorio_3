import { response, request} from "express";
import Enterprise from './enterprise.model.js';

export const enterprisesGet = async (req = request, res = response) => {
    const {limit, from} = req.query;
    const query = {state: true};

    const [total, enterprises] = await Promise.all([
        Enterprise.countDocuments(query),
        Enterprise.find(query)
        .skip(Number(from))
        .limit(Number(limit))
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