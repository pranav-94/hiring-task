
import { authRouter } from "./authRouter";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../utils/encrypt";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/generate";

const prisma = new PrismaClient();
export const appRouter = Router();

appRouter.use("/auth", authRouter);

appRouter.post('/post', async (req, res) => {
    const { title, description, status, dueDate, userId } = req.body;

    try {
        const result = await prisma.todo.create({
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
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ msg: 'Error creating todo' });
    }
});

appRouter.get('/get', async (req, res) => {
    const { userId } = req.query;

    try {
        const result = await prisma.todo.findMany({
            where: {
                userId: parseInt(userId as string, 10)
            }
        });

        res.status(200).json({
            msg: 'Todos found',
            data: result
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ msg: 'Error fetching todos' });
    }
});

appRouter.delete('/delete', async (req, res) => {
    const { id, userId } = req.body;

    if (!id || !userId) {
        return res.status(400).json({ msg: 'ID and userId are required' });
    }

    try {
        const result = await prisma.todo.deleteMany({
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
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ msg: 'Error deleting todo' });
    }
});

appRouter.put('/update', async (req, res) => {
    const { id, title, description, status, dueDate, userId } = req.body;

    if (!id || !userId) {
        return res.status(400).json({ msg: 'ID and userId are required' });
    }

    try {
        const result = await prisma.todo.updateMany({
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
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ msg: 'Error updating todo' });
    }
});

appRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await encryptPassword(password);

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            msg: 'User created',
            data: { id: newUser.id, username: newUser.username },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: 'Error creating user' });
    }
});

appRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            msg: 'Login successful',
            token,
            userId: user.id
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: 'Error during login' });
    }
});

