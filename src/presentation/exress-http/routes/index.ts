import { Router } from "express";
import userRouter from "./userRoute";


export const indexRouter = Router(); 

indexRouter.get('/', (req: any, res: any) => {
    console.log('woriing')
    res.json({message: 'cool'})
})

indexRouter.use('/user', userRouter);

