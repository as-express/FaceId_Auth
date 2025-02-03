"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_js_1 = require("../../config/env.config.js");
const tokenGenerator = (userId) => {
    const token = jsonwebtoken_1.default.sign({
        userId
    }, String(env_config_js_1.env.JWT_SECRET) || 'secret', {
        expiresIn: Number(env_config_js_1.env.JWT_EXPIRE) || 1
    });
    return token;
};
exports.tokenGenerator = tokenGenerator;
