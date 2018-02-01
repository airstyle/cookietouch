import GuildEmblem from "./GuildEmblem";
import GuildInformations from "./GuildInformations";

export default class GuildFactSheetInformations extends GuildInformations {
  public leaderId: number;
  public guildLevel: number;
  public nbMembers: number;

  constructor(guildId = 0, guildName = "", guildEmblem: GuildEmblem = null,
              leaderId = 0, guildLevel = 0, nbMembers = 0) {
    super(guildId, guildName, guildEmblem);
    this.leaderId = leaderId;
    this.guildLevel = guildLevel;
    this.nbMembers = nbMembers;
  }
}
