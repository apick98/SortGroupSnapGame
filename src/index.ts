import Card from "./card";
import Player from "./player";

function main(): void {
    const numOfDecks: number = 1;
    let deck: Card[] = createDeck(numOfDecks);
    let players: Player[] = [new Player('Player 1'), new Player('Player 2')];
    
    deck = dealCards(deck, players).deck;
    players = dealCards(deck, players).players;

    // console.log(players[0].hand.length)
    // console.log(players[1].hand.length)

    // console.log(deck.length)
    
    // for (let card of deck){
    //     console.log(card);
    // }
    
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

function createDeck(numOfDecks: number = 1): Card[] {
    let suits: string[] = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    let values: string[] = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
    let deck: Card[] = [];

    for (let i: number = 0; i < numOfDecks; i++){
       for (let suit of suits){
            for (let value of values){
                deck.push(new Card(value, suit));
            }
        } 
    }
    
    return deck;
}

main()