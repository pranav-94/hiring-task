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
exports.getOneUser = exports.createUser = void 0;
const entities_1 = require("../entities");
const db_1 = require("../db");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = data;
    const userRepository = db_1.AppDataSouce.getRepository(entities_1.UserEntity);
    const existingUser = yield userRepository.findOne({
        where: { email },
    });
    if (existingUser)
        return null;
    const user = userRepository.create({ username, email, password });
    yield userRepository.save(user);
    return user;
});
exports.createUser = createUser;
const getOneUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = db_1.AppDataSouce.getRepository(entities_1.UserEntity);
    const findUser = yield userRepository.findOne({ where: Object.assign({}, data) });
    if (!findUser)
        return null;
    return findUser;
});
exports.getOneUser = getOneUser;
//# sourceMappingURL=user.service.js.map