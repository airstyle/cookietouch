import Account from "../../Account";
import { CharacterState } from "./CharacterState";
import Inventory from "./Inventory";
import Spell from "./Spell";

export default class Character {

  public state: CharacterState;
  public cellId: number;
  public restrictions: any;
  public stats: any;
  public infos: any;
  public inventory: Inventory;
  public spells: Spell[];

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.state = CharacterState.IDLE;
    this.inventory = new Inventory(this.account);
    this.register();
  }

  public isBusy(): boolean {
    return this.state !== CharacterState.IDLE && this.state !== CharacterState.REGENERATING;
  }

  private register() {
    this.account.dispatcher.register("SetCharacterRestrictionsMessage",
      this.HandleSetCharacterRestrictionsMessage, this);
    this.account.dispatcher.register("CharacterStatsListMessage",
      this.HandleCharacterStatsListMessage, this);
    this.account.dispatcher.register("SpellListMessage",
      this.HandleSpellListMessage, this);
    this.account.dispatcher.register("CharacterLevelUpMessage",
      this.HandleCharacterLevelUpMessage, this);
  }

  private HandleSetCharacterRestrictionsMessage(account: Account, data: any) {
    account.game.character.restrictions = data.restrictions;
  }

  private HandleCharacterStatsListMessage(account: Account, data: any) {
    account.game.character.stats = data.stats;
  }
  private HandleSpellListMessage(account: Account, data: any) {
    account.game.character.spells = data.spells;
  }
  private HandleCharacterLevelUpMessage(account: Account, data: any) {
    console.log("Vous venez de passer niveau : " + data.newLevel);
  }
}