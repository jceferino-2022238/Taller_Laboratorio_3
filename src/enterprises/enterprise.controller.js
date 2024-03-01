import { response, request} from "express";
import Enterprise from './enterprise.model.js';
import excelJs from 'exceljs'

export const enterprisesPost = async (req, res) =>{
    const {name, description, country, enterpriseCategory, impactLevel, yearsInMarket} = req.body;
    const enterprise = new Enterprise({name, description, country, enterpriseCategory, impactLevel, yearsInMarket});

    await enterprise.save();

    res.status(200).json({
        enterprise
    });
}

export const enterprisesPut = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, name, country, ...rest} = req.body;
    await Enterprise.findByIdAndUpdate(id, rest);

    const enterprise = await Enterprise.findOne({_id: id});
    res.status(200).json({
        msg: "Entreprise Updated",
        enterprise
    })
}


export const exportEnterprises = async (req, res) =>{
    try {
        let workbook = new excelJs.Workbook();

        const sheet = workbook.addWorksheet("books");
        sheet.columns = [
            {header: "ID", key:"_id", width: 25},
            {header: "Name", key:"name", width: 50},
            {header: "Description", key:"description", width: 50},
            {header: "Country", key:"country", width: 50},
            {header: "EnterpriseCategory", key:"enterpriseCategory", width: 50},
            {header: "ImpactLevel", key:"impactLevel", width: 50},
            {header: "YearsInMarket", key:"yearsInMarket", width: 50}
        ]
        const enterprises = await Enterprise.find({});

        enterprises.forEach(enterprise =>{
            sheet.addRow(enterprise.toObject());
        })

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition","attatchment: filename=enterprisesData.xlsx");
        res.status(200).send(buffer);
    } catch (e) {
        console.log(e),
        res.status(400).json({
            msg: 'Could not complete the process'
        }) 
    }
}

export const enterprisesGet = async (req = request, res = response) => {
    const {limit, from, sortBy} = req.query;
    const query = {state: true};
    let sort
    if(sortBy == ''){
        return res.status(401).json({
            msg: 'Sort cant be null'
        })
    }
    if(sortBy == 'AZ'){
        sort = {name: 1}
    }
    if(sortBy == 'ZA'){
        sort = {name: -1}
    }
    if(sortBy == 'CATEGORY'){
        sort = {enterpriseCategory: 1}
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






