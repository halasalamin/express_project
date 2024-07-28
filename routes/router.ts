import { Router, Request, Response, NextFunction } from "express";
import { createCustomer, editCustomer, getAllCustomers, getCustomer, removeCustomer,  } from "../controllers/customerController.js";

const router = Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.body.name){
            res.status(400).json({
                message: "Name is missing!!",
                success: false
            })
        }

        if(!req.body.mobilePhone){
            res.status(400).json({
                message: "Mobile Phone is missing!!",
                success: false
            })
        }

        if(req.body.balance === undefined) {
            res.status(400).json({
                message: "Balance is missing!!",
                success: false
            })
        }

        const customer = await createCustomer(req.body)

        res.status(201).json({
            data: customer
        })

    } catch (error) {
        console.log("error: " + error);
        next(error)
    }

})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const customerId = Number(req.params.id)
        const customer = await getCustomer(customerId)

        res.status(200).json({
            data: customer
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

router.get('/', getAllCustomers)


router.delete('/:id', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const customerId = Number(req.params.id)
        await removeCustomer(customerId)

        res.status(200).json({
            message: "Customer removed successfully",
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const customerId = Number(req.params.id)
        const customer = await editCustomer(customerId, req.body)

        res.status(200).json({
            message: "Customer edited successfully",
            data: customer
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

export default router