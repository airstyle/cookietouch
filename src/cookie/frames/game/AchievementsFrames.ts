import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";
import DataManager from "@/protocol/data";
import Achievements from "@/protocol/data/classes/Achievements";
import { DataTypes } from "@/protocol/data/DataTypes";

export default class AchievementsFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "AchievementRewardSuccessMessage",
      this.HandleAchievementRewardSuccessMessage,
      this
    );
    Frames.dispatcher.register(
      "AchievementFinishedMessage",
      this.HandleAchievementFinishedMessage,
      this
    );
    Frames.dispatcher.register(
      "AchievementListMessage",
      this.HandleAchievementListMessage,
      this
    );
  }

  private async HandleAchievementRewardSuccessMessage(
    account: Account,
    message: any
  ) {
    account.statistics.UpdateAchievementRewardSuccessMessage(message);
    const achievementResp = await DataManager.get<Achievements>(
      DataTypes.Achievements,
      message.achievementId
    );
    const a = achievementResp[0].object;
    account.logger.logInfo(
      "AchievementsFrame",
      LanguageManager.trans("achievementReward", a.nameId, a.points)
    );
  }

  private async HandleAchievementFinishedMessage(
    account: Account,
    message: any
  ) {
    if (!account.config.acceptAchievements) {
      return;
    }

    account.network.sendMessageFree("AchievementRewardRequestMessage", {
      achievementId: message.id
    });
  }

  private async HandleAchievementListMessage(account: Account, message: any) {
    if (!account.config.acceptAchievements) {
      return;
    }

    for (const achiv of message.rewardableAchievements) {
      account.network.sendMessageFree("AchievementRewardRequestMessage", {
        achievementId: achiv.id
      });
    }
  }
}
