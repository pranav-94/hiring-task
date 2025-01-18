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
exports.appRouter = void 0;
const authRouter_1 = require("./authRouter");
const express_1 = require("express");
const client_1 = require("@prisma/client");
const encrypt_1 = require("../utils/encrypt");
const password_1 = require("../utils/password");
const generate_1 = require("../utils/generate");
const prisma = new client_1.PrismaClient();
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use("/auth", authRouter_1.authRouter);
exports.appRouter.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, dueDate, userId } = req.body;
    try {
        const result = yield prisma.todo.create({
            data: {
                title,
                description,
                status,
                dueDate,
                userId: parseInt(userId, 10)
            }
        });
        res.status(200).json({
            msg: 'Todo created',
            data: result
        });
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ msg: 'Error creating todo' });
    }
}));
exports.appRouter.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const result = yield prisma.todo.findMany({
            where: {
                userId: parseInt(userId, 10)
            }
        });
        res.status(200).json({
            msg: 'Todos found',
            data: result
        });
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ msg: 'Error fetching todos' });
    }
}));
exports.appRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId } = req.body;
    if (!id || !userId) {
        return res.status(400).json({ msg: 'ID and userId are required' });
    }
    try {
        const result = yield prisma.todo.deleteMany({
            where: {
                id: parseInt(id, 10),
                userId: parseInt(userId, 10)
            }
        });
        if (result.count === 0) {
            return res.status(404).json({ msg: 'Todo not found or not authorized to delete' });
        }
        res.status(200).json({
            msg: 'Todo deleted',
            data: result
        });
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ msg: 'Error deleting todo' });
    }
}));
exports.appRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, description, status, dueDate, userId } = req.body;
    if (!id || !userId) {
        return res.status(400).json({ msg: 'ID and userId are required' });
    }
    try {
        const result = yield prisma.todo.updateMany({
            where: {
                id: parseInt(id, 10),
                userId: parseInt(userId, 10)
            },
            data: {
                title,
                description,
                status,
                dueDate
            }
        });
        if (result.count === 0) {
            return res.status(404).json({ msg: 'Todo not found or not authorized to update' });
        }
        res.status(200).json({
            msg: 'Todo updated',
            data: result
        });
    }
    catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ msg: 'Error updating todo' });
    }
}));
exports.appRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const hashedPassword = yield (0, encrypt_1.encryptPassword)(password);
        const newUser = yield prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            msg: 'User created',
            data: { id: newUser.id, username: newUser.username },
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: 'Error creating user' });
    }
}));
exports.appRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { username },
        });
        if (!user || !(yield (0, password_1.comparePassword)(password, user.password))) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const token = (0, generate_1.generateToken)(user.id);
        res.status(200).json({
            msg: 'Login successful',
            token,
            userId: user.id
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: 'Error during login' });
    }
}));
//# sourceMappingURL=index.js.map