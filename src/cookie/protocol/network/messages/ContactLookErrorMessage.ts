import Message from "./Message";

export default class ContactLookErrorMessage extends Message {
  public requestId: number;

  constructor(requestId = 0) {
    super();
    this.requestId = requestId;

  }
}
