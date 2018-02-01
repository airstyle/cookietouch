import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightLifePointsLostMessage extends AbstractGameActionMessage {
  public targetId: number;
  public loss: number;
  public permanentDamages: number;
  public _isDead: boolean;

  constructor(actionId = 0, sourceId = 0, targetId = 0, loss = 0, permanentDamages = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.loss = loss;
    this.permanentDamages = permanentDamages;
  }
}
