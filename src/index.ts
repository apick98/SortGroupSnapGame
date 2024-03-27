import Card from "./card";
import Player from "./player";

function main(): void {
    const numOfDecks: number = 1;
    const numOfPlayers: number = 2;
    const numOfRounds: number = 5;
    
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