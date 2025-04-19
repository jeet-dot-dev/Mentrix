import { Router } from "express";
import { genQuestion } from "../controller/questions.controller";

const route = Router()

route.post('/generate-question', genQuestion)

export default route