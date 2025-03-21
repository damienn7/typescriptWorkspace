import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "user"})
export class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public email: string

    @Column()
    public password: string

    @CreateDateColumn({ type: "timestamptz" })
    public createdAt: Date // timestamp with timezone -> timestamptz

    @UpdateDateColumn({ type: "timestamptz" })
    public updatedAt: Date // timestamp with timezone -> timestamptz

    constructor(
        id: number,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}