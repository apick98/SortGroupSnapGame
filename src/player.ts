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
}

export default Player;