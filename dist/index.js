"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
const player_1 = __importDefault(require("./player"));
function main() {
    const numOfDecks = 1;
    const numOfPlayers = 2;
    const numOfRounds = 5;
    let deck = shuffleDeck(createDeck(numOfDecks));
    const { deck: table, players: players } = dealCards(deck, createPlayers(numOfPlayers));
    let roundIndex = 0;
    while (players.every(player => player.hand.length > 0) && roundIndex < numOfRounds) {
        for (let player of players) {
            let cardForTable = player.removeCardFromHand();
            if (cardForTable) {
                table.push(cardForTable);
            }
        }
        roundIndex++;
    }
    console.log(players[0].hand.length);
    console.log(players[1].hand.length);
    console.log(table.length);
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
function createPlayers(numOfPlayers) {
    let playersToAdd = [];
    for (let i = 0; i < numOfPlayers; i++) {
        playersToAdd.push(new player_1.default('Player ' + i));
    }
    return playersToAdd;
}
function shuffleDeck(deck) {
    let m = deck.length;
    let t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = deck[m];
        deck[m] = deck[i];
        deck[i] = t;
    }
    return deck;
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