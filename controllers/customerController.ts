import { Customer } from "../db/entities/customer.js"
import { AppError } from "../errors/appError.js";
import { Request, Response } from "express"


const validateCustomerPayload = (payload: Partial<Customer>) => {
    if (payload.name !== undefined && (typeof payload.name !== "string" || payload.name.trim() === "")) {
        throw new AppError("Name must be a non-empty string", 400, true);
    }

    if (payload.mobilePhone !== undefined && (typeof payload.mobilePhone !== "string" || payload.mobilePhone.trim() === "")) {
        throw new AppError("Mobile phone must be a non-empty string", 400, true);
    }

    if (payload.balance !== undefined) {
        if (typeof payload.balance !== "number" || payload.balance < 0) {
            throw new AppError("Balance must be a non-negative number", 400, true);
        }
    }
}


const createCustomer = async (payload: Customer)=>{

    validateCustomerPayload(payload)


    const customer = await Customer.findOne({
        where:{ 
            mobilePhone: payload.mobilePhone,
    }});

    if (customer) {
        throw new AppError("A customer with this mobile phone number already exists", 409, true)
    }

    const newCustomer = Customer.create(payload)

    return newCustomer.save()
}

const getCustomer = async( customerId: number) =>{
    const customer = await Customer.findOne({ where: { id: customerId}})

    if(!customer){
        throw new AppError('Customer not found', 404, true)
    }

   return customer
}

const getAllCustomers = async (req: Request, res: Response) => {
    const customers = await Customer.find();
    
    res.status(200).json({
        msg: "Getting all customers successfully",
        data: customers
    })
}

const removeCustomer = async (customerId: number) =>{
    const customer = await Customer.findOne({ where: { id: customerId}})

    if(!customer){
        throw new AppError('Customer not found', 404, true)
    }

   return customer.remove()
}

const editCustomer = async (customerId: number, payload: Customer) =>{

    validateCustomerPayload(payload);


    const customer = await Customer.findOne({ where: { id: customerId}})
    

    if(!customer){
        throw new AppError('Customer not found', 404, true)
    }


    if(payload.mobilePhone && payload.mobilePhone !== customer.mobilePhone){
        const existCustomer = await Customer.findOne({ where: { mobilePhone: payload.mobilePhone}})
        if(existCustomer){
            throw new AppError('Customer phone is already in use', 404, true)
        }
    
        customer.mobilePhone =  payload.mobilePhone
    }


   if(payload.name){
    customer.name =  payload.name
   }


   if (payload.balance !== undefined) {
        customer.balance = payload.balance;
    }

   return customer.save()
}

export {createCustomer, getCustomer, getAllCustomers, removeCustomer, editCustomer}