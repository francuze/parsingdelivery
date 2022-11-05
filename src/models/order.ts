import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Long,
  } from "typeorm";
  
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    author!: string;
  
    @Column({type: 'longtext'})
    body!: string;
  /**
   * Рейтинг отзыва
   * @example "😊"
   */
    @Column()
    rating!: string;
  
    @CreateDateColumn()
    time!: Date;

    @Column()
    orderHash!: string;

    @Column(`json`)
    products!: string;

    @Column(`json`)
    answers!: string;
  }
  