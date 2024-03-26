"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
const player_1 = __importDefault(require("./player"));
function main() {
    const numOfDecks = 1;
    let deck = createDeck(numOfDecks);
    let players = [new player_1.default('Player 1'), new player_1.default('Player 2')];
    deck = dealCards(deck, players).deck;
    players = dealCards(deck, players).players;
    console.log(players[0].hand.length);
    console.log(players[1].hand.length);
    console.log(deck.length);
    for (let card of deck) {
        console.log(card);
    }
}
function dealCards(deck, players) {
    const cardsToLeaveOnTable = deck.length % players.length;
    while (deck.length > cardsToLeaveOnTable) {
        for (let player of players) {
            let card = deck.shift();
            if (card) {
                player.addCardToHand(card);
            }
        }
    }
    return { deck, players };
}
function createDeck(numOfDecks = 1) {
    let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    let values = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    let deck = [];
    for (let i = 0; i < numOfDecks; i++) {
        for (let suit of suits) {
            for (let value of values) {
                deck.push(new card_1.default(value, suit));
            }
        }
    }
    return deck;
}
main();
//# sourceMappingURL=index.js.map