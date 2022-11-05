import express from "express";
import OrderController from "../controllers/ordersController";
import ParserController from "../controllers/parserController";
import axios from "axios";
const router = express.Router();


router.get("/parser", async (_req, res) => {
  const controller = new OrderController();
  const response = await controller.getParsers();
  return res.send(response);
});


router.get("/parser/:id", async (req, res) => {
  const controller = new OrderController();
  const response = await controller.getParser(req.params.id);
  if (!response) return res.status(404).send({ message: "No order found" });
  return res.send(response);

});

router.post("/parser", async (_req, res) => {
  const controller = new ParserController();
  try {
      // Если мы работаем с большим объемом данных, то мы можем упереться в лимиты по памяти
      // Тогда мы потихоньку загружаем 
    const limit = 100;
    const chankSize = 10;
    const offset = 0;
    const chainId = 48274;
    let resultOfSave
    let json = []
    const cycleCount = Math.ceil(limit / chankSize);
    for (let i = 0; i < cycleCount; i++) {
      const data = (await axios.get('https://api.delivery-club.ru/api1.2/reviews', {
        params: {
          chainId,
          limit: limit,
          offset: offset + chankSize * i,
          cacheBreaker: 1664679021,
        }
      })).data;
      for (let j = 0; j < data.reviews.length; j++) {
        console.log(data.reviews[j]);
        resultOfSave = await controller.parser(data.reviews[j]);
        json.push(data.reviews[j])
        console.log({ resultOfSave });
      }
    }
      return res.send(json);
  } catch (error) {
    console.log(error)
  }
});

export default router;