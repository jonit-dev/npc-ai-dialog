import { appEnv } from "@providers/constants/envConstants";
import { BadRequestError } from "@providers/errors/BadRequestError";
import { provide } from "inversify-binding-decorators";
import { Configuration, OpenAIApi } from "openai";
import { HttpStatus } from "types/ServerTypes";

@provide(OpenAI)
export class OpenAI {
  private configuration = new Configuration({
    apiKey: appEnv.openAI.apiKey,
  });

  private openAI = new OpenAIApi(this.configuration);

  public async listEngines(): Promise<any> {
    try {
      const engines = await this.openAI.listEngines();

      return engines.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async completion(): Promise<any> {
    const response = await this.openAI.createCompletion({
      model: "text-davinci-002",
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 6,
    });

    if (response.status !== HttpStatus.OK) {
      throw new BadRequestError("Request failed!");
    }

    return response.data;
  }
}
