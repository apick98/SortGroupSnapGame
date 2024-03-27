"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
const player_1 = __importDefault(require("./player"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
function main() {
    const prompt = (0, prompt_sync_1.default)();
    const numOfDecks = getUserInput("Enter the number of decks (1 - 4): ", 1, 4, prompt);
    const numOfPlayers = getUserInput("Enter the number of players (2 - 4): ", 2, 4, prompt);
    const numOfRounds = getUserInput("Enter the max number of rounds (1+): ", 1, Infinity, prompt);
    const snapMode = getUserInput("Enter '0' for basic face-based snap or '1' for face and suit based snap: ", 0, 1, prompt);
    let orderedDeck = createDeck(numOfDecks);
    let shuffledDeck = shuffleDeck(orderedDeck);
    let playersToAdd = createPlayers(numOfPlayers);
    let { deck: table, players: players } = dealCards(shuffledDeck, playersToAdd);
    playGame(players, table, numOfRounds, snapMode);
}
function playGame(players, table, numOfRounds, snapMode) {
    let roundIndex = 0;
    while (players.every(player => player.hand.length > 0) && roundIndex < numOfRounds) {
        for (let player of players) {
            if (table.length > 0) {
                console.log("Top card of table", table[0], player.name, player.hand[0]);
                let snap = checkSnap(player, snapMode, table);
                if (snap) {
                    console.log("SNAP");
                    let cardToTheBack = player.hand.shift();
                    if (cardToTheBack) {
                        player.addCardToHand(cardToTheBack);
                    }
                    for (let card of table) {
                        player.addCardToHand(card);
                    }
                    table = [];
                }
                else {
                    let cardForTable = player.removeCardFromHand();
                    if (cardForTable) {
                        table.push(cardForTable);
                    }
                }
            }
            else {
                console.log("No cards on the table");
                let cardForTable = player.removeCardFromHand();
                if (cardForTable) {
                    table.push(cardForTable);
                }
            }
            console.log(player.name + " has " + player.hand.length + " cards in their hand");
        }
        roundIndex++;
    }
    displayWinner(players);
}
function displayWinner(players) {
    let mostCardsPlayer = null;
    let mostCardsCount = 0;
    for (let player of players) {
        if (player.hand.length > mostCardsCount) {
            mostCardsCount = player.hand.length;
            mostCardsPlayer = player;
        }
    }
    if (mostCardsPlayer) {
        console.log("The winner is: ", mostCardsPlayer.name, " with ", mostCardsCount, " cards");
    }
}
function checkSnap(player, snapMode, table) {
    if (snapMode == 0 && table[0].face == player.hand[0].face) {
        return true;
    }
    else if (snapMode == 1 && (table[0].face == player.hand[0].face && table[0].suit == player.hand[0].suit)) {
        return true;
    }
    else {
        return false;
    }
}
function getUserInput(promptMessage, min, max, prompt) {
    let input = NaN;
    while (isNaN(input) || input < min || input > max) {
        input = Number(prompt(promptMessage));
    }
    return input;
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
    let faces = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    let deck = [];
    for (let i = 0; i < numOfDecks; i++) {
        for (let suit of suits) {
            for (let face of faces) {
                deck.push(new card_1.default(face, suit));
            }
        }
    }
    return deck;
}
main();
//# sourceMappingURL=index.js.map