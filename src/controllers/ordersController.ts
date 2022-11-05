import { Get, Route, Post, Path } from "tsoa";
import { Order } from "../models/order";
import {
  getParsers,
  getParser,
  Orders
} from "../repositories/orders";
@Route("parser")
export default class OrderController {
  /**
   * Получаем всех отзывы с фильтрации по дате и рейтингу
   */
  @Get("/")
  public async getParsers(): Promise<Array<Order>> {
    return getParsers();
  }
/**
   * Получаем отзыв по ID
   * @param id Ид
   */
  @Get("/:id")
  public async getParser(@Path() id: string): Promise<Order | null> {
    return getParser(Number(id));
  }
}

