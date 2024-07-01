import { Card } from "src/cards/card.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity({ name:'users' })
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    fullName: string

    @Column({type: 'date'})
    date_of_birth: Date

    @Column({type: 'date'})
    date_of_baptism: Date

    @Column()
    esperanza: string

    @Column()
    anciano: boolean

    @Column()
    siervo_ministerial: boolean

    @Column()
    genero: string

    @Column()
    precursorado: string

    @Column()
    grupo: number

    @Column()
    sg: string

    @Column({nullable: true, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true, default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date

    @OneToMany(() => Card, card => card.user)
    cards: Card[]
}