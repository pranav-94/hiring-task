import { authRouter } from "./authRouter";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../utils/encrypt";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/generate";
// import { userService } from "../services";

const prisma = new PrismaClient();
export const appRouter = Router();

appRouter.use("/auth", authRouter);

appRouter.post('/post',async (req,res)=>{
    const Data = req.body 

    const result = await prisma.todo.create({
        data: {
            title: Data.title,
            description: Data.description,
            status: Data.status,
            dueDate: Data.dueDate
        }
    })

    res.status(200).json({
        msg: 'data uploaded',
        data: result
    })

})

appRouter.get('/get',async(req,res)=>{

    const Data = req.body

    const result = await prisma.todo.findFirst({
        where: {
            title: Data.title
        }
    })

    res.status(200).json({
        msg: 'todo found',
        data: result
    })
})

appRouter.delete('/delelte',async(req,res)=>{

    const Data = req.body

    const result = await prisma.todo.delete({
        where: {
            title: Data.title
        }
    })

    res.status(200).json({
        msg: 'todo deleted',
        data: result
    })

})

appRouter.put('/update',(req,res)=>{

})

appRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await encryptPassword(password);

    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });

    res.status(201).json({
        msg: 'User created',
        data: newUser,
    });
});

appRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

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
    });
});
