import { InternalServerError } from "@providers/errors/InternalServerError";
import { OpenAI } from "@providers/open-ai/OpenAi";
import { Request, Response } from "express";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { HttpStatus } from "types/ServerTypes";

@controller("/open-ai")
export class NPCDialogController implements interfaces.Controller {
  constructor(private openAI: OpenAI) {}

  @httpGet("/answers")
  private async getAnswers(@request() req: Request, @response() res: Response): Promise<any> {
    // const { question } = req.query;

    try {
      const answer = await this.openAI.completion();

      return res.status(HttpStatus.OK).send({
        answer,
      });
    } catch (error) {
      return new InternalServerError(error.message);
    }
  }
}
