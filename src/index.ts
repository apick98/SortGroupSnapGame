import Card from "./card";

function main(): void {
    const numOfDecks: number = 1;
    let deck: Card[] = createDeck(numOfDecks);
    
    // for (let card of deck){
    //     console.log(card)
    // }
    // console.log(deck.length)
    
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