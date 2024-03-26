"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
function main() {
    const numOfDecks = 1;
    let deck = createDeck(numOfDecks);
    console.log(deck.length);
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