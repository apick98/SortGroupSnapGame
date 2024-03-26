import Card from "./card";

class Player{
    name: string;
    hand: Card[];

  constructor(name: string) {
    this.name = name;
    this.hand = [];
  }

  addCardToHand(card: Card) {
    this.hand.push(card);
  }

  removeCardFromHand(): Card | undefined{
    return this.hand.shift();
  }
}

export default Player;