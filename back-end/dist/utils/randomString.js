"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (num) => {
    const str = "oierqofdgfabeflkanenfubvohadvbaew";
    let randomString = '';
    for (let i = 0; i < num; i++) {
        randomString += str[Math.floor(Math.random() * str.length)];
    }
    return randomString;
};
exports.random = random;
