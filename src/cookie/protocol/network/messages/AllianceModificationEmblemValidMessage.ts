import GuildEmblem from "@protocol/network/types/GuildEmblem";
import Message from "./Message";

export default class AllianceModificationEmblemValidMessage extends Message {
  public alliancemblem: GuildEmblem;

  constructor(alliancemblem: GuildEmblem = null) {
    super();
    this.alliancemblem = alliancemblem;

  }
}
