import { PlayerPosition } from "../types/playerPositionData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    checkIfIsForbiddenPosition,
    checkIfPlayerIsAlreadyOnPosition,
    checkIfRightHalfOfTheFiledHasBeenFilled,
    checkIfLeftHalfOfTheFiledHasBeenFilled,
    findPlayerIndex,
    sortPlayerPositionsByX,
    generatePositionXOnTheRight,
    generatePositionXOnTheLeft,
    generateRandomXPitchPosition,
    generateRandomYPitchPosition,
    checkIfFootballIsAlreadyOnPosition
} from "../utils/positionUtil";
import { FootballPosition } from "../types/footballPositionData";

type PositionsState = {
    footballPosition: FootballPosition
    playerPositions: PlayerPosition[]
};

type PlayerPositionActionPayload = {
    playerX: number;
    playerY: number;
    x: number;
    y: number;
}

type FootballPositionActionPayload = {
    x: number;
    y: number;
}

const initialPositionsState: PositionsState = {
    footballPosition: { footballX: 0, footballY: 0 },
    playerPositions: [
        { playerX: 3, playerY: 0},
        { playerX: 4, playerY: 0},
        { playerX: 5, playerY: 0},
        { playerX: 6, playerY: 0},
        { playerX: 7, playerY: 0},
        { playerX: 8, playerY: 0},
        { playerX: 9, playerY: 0},
        { playerX: 10, playerY: 0},
        { playerX: 11, playerY: 0},
        { playerX: 12, playerY: 0}
    ]
};

const positionsSlice = createSlice({
    name: 'positions',
    initialState: initialPositionsState,
    reducers: {
        setFootballPosition(state, action: PayloadAction<FootballPositionActionPayload>) {
            const x = action.payload.x;
            const y = action.payload.y;
            const playerPositionsCopied = [...state.playerPositions];

            if (!checkIfPlayerIsAlreadyOnPosition(x, y, playerPositionsCopied)
                && !checkIfIsForbiddenPosition(x, y)) {
                state.footballPosition = { footballX: x, footballY: y } as FootballPosition
            }
        },
        setPlayerPosition(state, action: PayloadAction<PlayerPositionActionPayload>) {
            const x = action.payload.x;
            const y = action.payload.y;
            const playerX = action.payload.playerX;
            const playerY = action.payload.playerY;
            const playerPositionsCopied = [...state.playerPositions];

            if (!checkIfPlayerIsAlreadyOnPosition(x, y, playerPositionsCopied)
                && !checkIfFootballIsAlreadyOnPosition(x, y, state.footballPosition)
                && !checkIfIsForbiddenPosition(x, y)) {
                const playerIndex = findPlayerIndex(playerX, playerY, state.playerPositions);

                playerPositionsCopied[playerIndex].playerX = action.payload.x;
                playerPositionsCopied[playerIndex].playerY = action.payload.y;
            }

            state.playerPositions = playerPositionsCopied;
        },
        randomizePlayerPositions(state) {
            state.playerPositions = [];
            const playerPositionsRandom = [];

            while (playerPositionsRandom.length <= 9) {
                const x: number =
                    checkIfLeftHalfOfTheFiledHasBeenFilled(playerPositionsRandom) ?
                        generatePositionXOnTheRight() :
                    checkIfRightHalfOfTheFiledHasBeenFilled(playerPositionsRandom) ?
                        generatePositionXOnTheLeft() :
                        generateRandomXPitchPosition();
                const y = generateRandomYPitchPosition();

                if (!checkIfIsForbiddenPosition(x, y)
                    && !checkIfPlayerIsAlreadyOnPosition(x, y, playerPositionsRandom)
                    && !checkIfFootballIsAlreadyOnPosition(x, y, state.footballPosition)
                ) {
                    playerPositionsRandom.push({ playerX: x, playerY: y } as PlayerPosition);
                }
            }

            state.playerPositions = sortPlayerPositionsByX([...playerPositionsRandom]);
        }
    }
});

export default positionsSlice;
