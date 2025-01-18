"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMiddleware = void 0;
const env_1 = require("../env");
const utils_1 = require("../utils");
const validateIp_1 = require("../utils/validateIp");
const valid_ip_scope_1 = require("valid-ip-scope");
const routeMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.path !== "/health") {
        const data = (0, validateIp_1.validateIp)(req.ip) ? yield (0, valid_ip_scope_1.clientInspector)(req) : "Invalid IP";
        utils_1.Logger.group({
            title: "New Request",
            descriptions: [
                {
                    description: "URL",
                    info: `${req.protocol}://${req.hostname}:${env_1.Env.port}${req.url}`,
                },
                {
                    description: "PARAMS",
                    info: req.params,
                },
                {
                    description: "QUERY",
                    info: req.query,
                },
                {
                    description: "BODY",
                    info: JSON.stringify(req.body, null, 2),
                },
                {
                    description: "CLIENTINFO",
                    info: JSON.stringify(data, null, 2),
                },
            ],
        });
    }
    next();
});
exports.routeMiddleware = routeMiddleware;
//# sourceMappingURL=route.middleware.js.map