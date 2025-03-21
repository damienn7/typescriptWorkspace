import { Jwt } from "jsonwebtoken"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity({name: "user"})
export class Token {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public token: string

    @ManyToOne(() => User, (user) => user.tokens)
    public userId: User

    @CreateDateColumn({ type: "timestamptz" })
    public createdAt: Date // timestamp with timezone -> timestamptz

    @UpdateDateColumn({ type: "timestamptz" })
    public updatedAt: Date // timestamp with timezone -> timestamptz

    constructor(
        id: number,
        token: string,
        userId: User,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.token = token;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}