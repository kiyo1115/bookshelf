import express from "express";
//リクエストで飛んできたものが妥当なものかを調べる
import { body } from "express-validator";
import {
  getAllBooks,
  getBookById,
  registBook,
  updateBook,
  deleteBook,
} from "../controllers/books.mjs";
import {requestErrorHandler} from "../helpers/helper.mjs"
const router = express.Router();



//これで内部的にはapi/books/にアクセスしている状態
router.get("/", requestErrorHandler(getAllBooks));

router.get("/:id", requestErrorHandler(getBookById));

router.post(
  "/",
  // 上から順にチェックしていくだけで、下記は第二引数とかそういった記載方法ではない
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("comment").notEmpty(),
  // ratingフィールドが存在しない場合または1から5の整数ではない場合はエラーを排出します
  body("rating").notEmpty().isInt({ min: 1, max: 5 }),
  //チェック後はエラー有無に関わらずregistBookは実行される
  requestErrorHandler(registBook)
);

router.patch(
  "/:id",
  // .optional().をつけることで入力値があった場合のみフィールドが空でないことを確認
  body("title").optional().notEmpty(),
  body("description").optional().notEmpty(),
  body("comment").optional().notEmpty(),
  // ratingフィールドが存在しない場合または1から5の整数ではない場合はエラーを排出します
  body("rating").optional().notEmpty().isInt({ min: 1, max: 5 }),
  requestErrorHandler(updateBook)
);

router.delete("/:id", requestErrorHandler(deleteBook));

export default router;
