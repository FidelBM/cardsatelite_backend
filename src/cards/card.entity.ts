import { User } from "src/users/user.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"

@Entity({ name:'card' })
export class Card{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    horas: number

    @Column({nullable: true})
    comentarios: string

    @Column({nullable: true})
    cursos: number

    @Column()
    predico: boolean

    @Column()
    auxiliar: boolean

    @Column({nullable: true, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column()
    userId: number

    @ManyToOne(() => User, user => user.cards)
    user: User

}