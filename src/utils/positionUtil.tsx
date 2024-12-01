import { PlayerPosition } from "../models/playerPositionData";
import {FootballPosition} from "../models/footballPositionData";

export function checkIfIsForbiddenPosition(x: number, y: number): boolean {
    return (x === 0 && y === 3) || (x === 0 && y === 2) ||
           (x === 1 && y === 3) || (x === 1 && y === 2) ||
           (x === 0 && y === 7) || (x === 0 && y === 8) ||
           (x === 1 && y === 7) || (x === 1 && y === 8) ||
           (x === 14 && y === 3) || (x === 14 && y === 2) ||
           (x === 15 && y === 3) || (x === 15 && y === 2) ||
           (x === 14 && y === 7) || (x === 14 && y === 8) ||
           (x === 15 && y === 7) || (x === 15 && y === 8);
}

export function checkIfPlayerIsAlreadyOnPosition(x: number, y: number, playerPositions: PlayerPosition[]): boolean {
    return playerPositions.some(position => position.playerX === x && position.playerY === y);
}

export function checkIfFootballIsAlreadyOnPosition(x: number, y: number, footballPosition: FootballPosition): boolean {
    return footballPosition.footballX === x && footballPosition.footballY === y;
}

export function checkIfLeftHalfOfTheFiledHasBeenFilled(playerPositions: PlayerPosition[]): boolean {
    const leftHalfX = [0, 1, 2, 3, 4, 5, 6, 7]

    return playerPositions.filter(position => leftHalfX.includes(position.playerX)).length === 5;
}

export function checkIfRightHalfOfTheFiledHasBeenFilled(playerPositions: PlayerPosition[]): boolean {
    const rightHalfX = [8, 9, 10, 11, 12, 13, 14, 15]

    return playerPositions.filter(position => rightHalfX.includes(position.playerX)).length === 5;
}

export function sortPlayerPositionsByX(playerPositions: PlayerPosition[]): PlayerPosition[] {
    return [...playerPositions].sort((position1, position2) => position1.playerX - position2.playerX);
}

export function findPlayerIndex(x: number, y: number, playerPositions: PlayerPosition[]): number {
    return (playerPositions ?? []).findIndex(position => position.playerX === x && position.playerY === y);
}

export function generatePositionXOnTheRight(): number {
    return Math.floor(Math.random() * (15 - 8 + 1)) + 8;
}

export function generatePositionXOnTheLeft(): number {
    return  Math.floor(Math.random() * (7 + 1));
}

export function generateRandomXPitchPosition(): number {
    return Math.floor(Math.random() * 15 + 1);
}

export function generateRandomYPitchPosition(): number {
    return Math.floor(Math.random() * 11);
}
