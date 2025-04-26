import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'limit-time' })
export class LimitTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boolean: boolean;
}
