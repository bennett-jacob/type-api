import { Column, Entity, Index, OneToMany } from 'typeorm'
import { AltamirEntity } from '../_helpers/baseEntity'

@Entity()
export class Post extends AltamirEntity {
  @Column()
  public title: string

  @Column({ nullable: true })
  public body: string
}