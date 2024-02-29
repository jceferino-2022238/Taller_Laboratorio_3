import { Router } from "express";
import { check } from "express-validator";
import { enterprisesGet, enterprisesPost, enterprisesPut, exportEnterprises } from "./enterprise.controller.js";
import { eName, exEById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/role-validation.js";

const router = Router();

router.get(
    "/",
    [
        validateJWT,
        isAdminRole,
    ], enterprisesGet);

router.post(
    "/",
    [
        validateJWT,
        isAdminRole,
        check("name", "Name isnt optional").not().isEmpty(),
        check("name").custom(eName),
        check("description", "Description isnt optional").not().isEmpty(),
        check("country", "The country where the enterprise was founded isnt optional").not().isEmpty(),
        check("enterpriseCategory", "Enterprise category isnt optional").not().isEmpty(),
        check("impactLevel", "Enterprise impact level isnt optional").not().isEmpty(),
        check("yearsInMarket", "Enterprise years in market arent optional").not().isEmpty(),
        validateFields,
    ], enterprisesPost);

router.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exEById),
        validateFields
    ], enterprisesPut);

router.get(
    "/exportEnterprises",
    [
        validateJWT,
        isAdminRole
    ], exportEnterprises);
export default router;

