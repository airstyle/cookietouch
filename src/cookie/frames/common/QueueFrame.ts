import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";

export default class QueueFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "QueueStatusMessage",
      this.HandleQueueStatusMessage,
      this
    );
    Frames.dispatcher.register(
      "LoginQueueStatusMessage",
      this.HandleLoginQueueStatusMessage,
      this
    );
  }

  private async HandleQueueStatusMessage(account: Account, data: any) {
    account.logger.logDofus(
      "GameQueue",
      LanguageManager.trans("queueMessage", data.position, data.total)
    );
  }

  private async HandleLoginQueueStatusMessage(account: Account, data: any) {
    account.logger.logDofus(
      "LoginQueue",
      LanguageManager.trans("queueMessage", data.position, data.total)
    );
  }
}
