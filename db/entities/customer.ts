import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customer')
export class Customer extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false})
    name: string

    @Column( {unique : true, nullable: false})
    mobilePhone: string

    @Column({nullable: false})
    balance: number
}