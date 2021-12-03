import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export default class Task {
    @PrimaryColumn()
    task_id: string

    @Column()
    filename: string

    @Column()
    source_url: string

    @Column()
    date_create: Date
}