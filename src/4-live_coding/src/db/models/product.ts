import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "product"})
export class Product {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column()
    public price: number

    @CreateDateColumn({ type: "timestamptz" })
    public createdAt: Date // timestamp with timezone -> timestamptz

    @UpdateDateColumn({ type: "timestamptz" })
    public updatedAt: Date // timestamp with timezone -> timestamptz

    constructor(
        id: number,
        name: string,
        price: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}