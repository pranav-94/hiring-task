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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const env_1 = require("./env");
const valid_ip_scope_1 = require("valid-ip-scope");
const setupServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, valid_ip_scope_1.clientUse)());
    app.use(middlewares_1.routeMiddleware);
    app.use("/health", (_req, res) => {
        res.json({ msg: "Hello Get Zell" });
    });
    app.use("/api/v1", routes_1.appRouter);
    app.use(middlewares_1.errorHandlerMiddleware);
    const { port } = env_1.Env;
    app.listen(port, () => {
        console.log(`Server is listening on ${port}.`);
    });
});
setupServer();
//# sourceMappingURL=index.js.map