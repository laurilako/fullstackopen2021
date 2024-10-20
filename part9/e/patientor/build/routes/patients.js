"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const patient = patientsService_1.default.getEntries().find(p => p.id === req.params.id);
    // if patient does not have entries, return an empty array
    if (patient && !patient.entries) {
        patient.entries = [];
    }
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientEntrySchema.parse(req.body);
        next();
    }
    catch (e) {
        next(e);
    }
};
router.post('/', newPatientParser, (req, res) => {
    const newPatientEntry = patientsService_1.default.addPatient(req.body);
    res.json(newPatientEntry);
});
exports.default = router;
