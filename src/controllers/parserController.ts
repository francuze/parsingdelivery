import { Get, Route, Tags, Post, Body, SuccessResponse } from "tsoa";
import { Order } from "../models/order";
import {
  parser,
  Orders
} from "../repositories/orders";
@Route("parser")
export default class ParserController {
 /**
   * Парсим отзывы
   * @param count Количество запросов
   */
  @Post("/")
  @SuccessResponse("201", "Created")
  public async parser(@Body() body: Orders): Promise<Order> {
    return parser(body);
  }
}

