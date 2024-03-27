import Card from "./card";
import Player from "./player";
import PromptSync from "prompt-sync";

function main(): void {
    const prompt = PromptSync();

    let numOfDecks: number = 0;
    while(isNaN(numOfDecks) || (numOfDecks < 1 || numOfDecks > 4 )){
        numOfDecks = Number(prompt('Enter the number of decks (1 - 4): '));
    }

    let numOfPlayers: number = 0;
    while(isNaN(numOfPlayers) || (numOfPlayers < 2 || numOfPlayers > 4 )){
        numOfPlayers = Number(prompt('Enter the number of players (2 - 4): '));
    }

    let numOfRounds: number = 0;
    while(isNaN(numOfRounds) || (numOfRounds < 1)){
        numOfRounds = Number(prompt('Enter the max number of rounds (1+): '));
    }

    let snapMode: number = 99;
    while(isNaN(snapMode) || ((snapMode > 0 && snapMode < 1) || snapMode > 1)){
        snapMode = Number(prompt('Enter \'0\' for basic face-based snap or \'1\' for face and suit based snap: '));
    }
    
    
    let deck: Card[] = shuffleDeck(createDeck(numOfDecks));
    const { deck: table, players: players } = dealCards(deck, createPlayers(numOfPlayers));

    let roundIndex: number = 0;
    
    // Play till a player has no cards left
    while(players.every(player => player.hand.length > 0) && roundIndex < numOfRounds){
        // Let each player take a turn
        for(let player of players){
            // Remove the card from the current player's hand and add it to the table
            let cardForTable = player.removeCardFromHand();
            if(cardForTable){
                table.push(cardForTable);
            }
        }
        roundIndex++;
    }
}

function dealCards(deck: Card[], players: Player[]): { deck: Card[], players: Player[] } {
    const cardsToLeaveOnTable: number = deck.length % players.length;

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

function createPlayers(numOfPlayers: number): Player[]{
    let playersToAdd: Player[] = []
    for(let i: number = 0; i < numOfPlayers; i++){
        playersToAdd.push(new Player('Player ' + i));
    }

    return playersToAdd;
}

// Converted from Mike Bostock's JavaScript algorithm of the Fisher–Yates Shuffle - https://bost.ocks.org/mike/shuffle/
function shuffleDeck(deck: Card[]): Card[] {
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

function createDeck(numOfDecks: number = 1): Card[] {
    let suits: string[] = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    let faces: string[] = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
    let deck: Card[] = [];

    for (let i: number = 0; i < numOfDecks; i++){
       for (let suit of suits){
            for (let face of faces){
                deck.push(new Card(face, suit));
            }
        } 
    }
    
    return deck;
}

main()