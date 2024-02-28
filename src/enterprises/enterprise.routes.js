import { Router } from "express";
import { check } from "express-validator";
import { enterprisesGet, enterprisesPost } from "./enterprise.controller.js";
import { eName } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.get("/", enterprisesGet);

router.post(
    "/",
    [
        check("name", "Name isnt optional").not().isEmpty(),
        check("name").custom(eName),
        check("description", "Description isnt optional").not().isEmpty(),
        check("country", "The country where the enterprise was founded isnt optional").not().isEmpty(),
        check("enterpriseCategory", "Enterprise category isnt optional").not().isEmpty(),
        check("impactLevel", "Enterprise impact level isnt optional").not().isEmpty(),
        check("yearsInMarket", "Enterprise years in market arent optional").not().isEmpty(),
        validateFields,
    ], enterprisesPost);

export default router;

