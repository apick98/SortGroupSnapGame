"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }
    addCardToHand(card) {
        this.hand.push(card);
    }
}
exports.default = Player;
//# sourceMappingURL=player.js.map