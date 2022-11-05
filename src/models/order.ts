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
/**
   * Продукты
   * @example ['Бургер']
   */
    @Column(`json`)
    products!: string;
/**
   * Ответы на отзыв
   */
    @Column(`json`)
    answers!: string;
  }
  