import Card from "./card";
import Player from "./player";
//  Node module used for user input in the console
import PromptSync from "prompt-sync";

function main(): void {
    // Ask the user to give the number of decks, players, maximum rounds and mode of snap in order to create the game
    const prompt = PromptSync();

    const numOfDecks: number = getUserInput("Enter the number of decks (1 - 4): ", 1, 4, prompt);
    const numOfPlayers: number = getUserInput("Enter the number of players (2 - 4): ", 2, 4, prompt);
    const numOfRounds: number = getUserInput("Enter the max number of rounds (1+): ", 1, Infinity, prompt);
    const snapMode: number = getUserInput("Enter '0' for basic face-based snap or '1' for face and suit based snap: ", 0, 1, prompt);
    
    // Create a deck of 52 card instances
    let orderedDeck: Card[] = createDeck(numOfDecks);
    // Randomise the deck
    let shuffledDeck: Card[] = shuffleDeck(orderedDeck);
    // Create the players and then deal the cards alternately at a time
    let playersToAdd: Player[] = createPlayers(numOfPlayers);
    let { deck: table, players: players } = dealCards(shuffledDeck, playersToAdd);
    // Create the snap game using the settings given
    playGame(players, table, numOfRounds, snapMode);
}

function playGame(players: Player[], table: Card[], numOfRounds: number, snapMode: number) {
    // Current round of play
    let roundIndex: number = 0;
    // Play till a player has no cards left or round limit reached
    while(players.every(player => player.hand.length > 0) && roundIndex < numOfRounds){
        // Let each player take a turn
        for(let player of players){
            if(table.length > 0){
                console.log("Top card of table", table[0], player.name, player.hand[0]);
                // Flags when there is a snap
                let snap: boolean = checkSnap(player, snapMode, table);
                // IF SNAP
                if(snap){
                    console.log("SNAP")
                    // Put card used for snap to the back of a player's hand
                    let cardToTheBack: Card | undefined = player.hand.shift();
                    if (cardToTheBack) {
                        player.addCardToHand(cardToTheBack);
                    }
                    // Take cards off the table and give to the player
                    for(let card of table){
                        player.addCardToHand(card)
                    }
                    table = [];
                }
                else {
                // IF NO SNAP
                    // Remove the card from the current player's hand and add it to the table
                    let cardForTable = player.removeCardFromHand();
                    if(cardForTable){
                        table.push(cardForTable);
                    }
                }
            }
            else{
                console.log("No cards on the table")
                // IF NO SNAP
                    // Remove the card from the current player's hand and add it to the table
                    let cardForTable = player.removeCardFromHand();
                    if(cardForTable){
                        table.push(cardForTable);
                    }
            }
            // Card count update after each player's turn
            console.log(player.name + " has " + player.hand.length + " cards in their hand");
        }
        // Move onto the next round
        roundIndex++;
    }
    // At the end of the game display the winner
    displayWinner(players);
}

// Check each player's card count at the end and output the winner
function displayWinner(players: Player[]) {
    let mostCardsPlayer: Player | null = null;
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

// Check if a player has the same face or face and suit of the table's top card
function checkSnap(player: Player, snapMode: number, table: Card[]){
    // Check for snap based on player's game mode
    if(snapMode == 0 && table[0].face == player.hand[0].face){
        return true;
    }
    else if(snapMode == 1 && (table[0].face == player.hand[0].face && table[0].suit == player.hand[0].suit)){
        return true;
    }
    else{
        return false;
    }
}

// Function used to assist in getting the user's snap game settings
function getUserInput(promptMessage: string, min: number, max: number, prompt: any): number {
    let input: number = NaN;
    while(isNaN(input) || input < min || input > max) {
        input = Number(prompt(promptMessage));
    }
    return input;
}

// Deal the cards to every player created for the game alternately (and leave extras on the table)
function dealCards(deck: Card[], players: Player[]): { deck: Card[], players: Player[] } {
    const cardsToLeaveOnTable: number = deck.length % players.length;

    while (deck.length > cardsToLeaveOnTable) {
        for (let player of players) {
            let card: Card | undefined = deck.shift();
            if (card) {
                player.addCardToHand(card);
            }
        }
    }

    return { deck, players };
}
// Creates an amount of players specifed by the user
// Additional work would have allowed the use of the real players names
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

// Create instances of the card class within an array called deck
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

