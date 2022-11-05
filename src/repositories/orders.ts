import { DataSource } from "typeorm";
import { Order } from "../models/order";
import { AppDataSource } from "../config/database";

export interface Orders {
  rated: Date;
  icon: string;
  body: string;
  author: string;
  /**
   * @example "😊"
   */
  rating?: "😊" | "😖";
  time: Date;
  orderHash: string;
  products: string;
  answers: string
}

export const getParsers = async (): Promise<Array<Order>> => {
  const userRepository = AppDataSource.getRepository(Order);
  let riewvs = userRepository.find({
    order: {
      time: 'ASC'
    }
  });
  (await riewvs).sort((a: Order) => {
    
    if (a.rating === '😖') return 1;
    if (a.rating === '😊') return -1;
    return 0
  }); 
  return riewvs
};
//Фу
export const parser = async (order: Orders): Promise<Order> => {
  const userRepository = AppDataSource.getRepository(Order);
  const user = new Order();
  user.author = order.author;
  user.rating = order.icon;
  user.time = order.rated;
  user.orderHash = order.orderHash;
  user.body = order.body;
  user.products = order.products;
  user.answers = order.answers;
  const review = await userRepository.findOne({
    where: {
      orderHash: user.orderHash,
    },
  });
  if (review) {
    return review;
  } else {
    return userRepository.save({
      ...user,
    });
  }
};

export const getParser = async (id: number): Promise<Order | null> => {
  const userRepository = AppDataSource.getRepository(Order);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });
  
  if (!user) return null

  return user;
};
