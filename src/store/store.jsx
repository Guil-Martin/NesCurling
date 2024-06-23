import { create } from "zustand";
import { playerColors } from "../utils/gameData";

export const useGameStore = create((set, get) => ({
  gameHistory: localStorage.getItem("gameHistory")
    ? JSON.parse(localStorage.getItem("gameHistory"))
    : [],
  addToGameHistory: (gameData) => {
    const newHistory = [gameData, ...get().gameHistory];
    localStorage.setItem("gameHistory", JSON.stringify(newHistory));
    set({ gameHistory: newHistory });
  },
  removeGameHistory: (id) => {
    const newHistory = get().gameHistory.filter(
      (gameData) => gameData.id !== id
    );
    localStorage.setItem("gameHistory", newHistory);
    set({ gameHistory: newHistory });
  },

  debug: false,
  setDebug: () => set({ debug: !get().debug }),

  mainCamera: null,
  setMainCameraRef: (camearaRef) => set({ mainCamera: camearaRef }),

  orbitControlsRef: null,
  setOrbitControlsRef: (obRef) => set({ orbitControlsRef: obRef }),

  setCameraAngle: (angle) => {
    const szt = get().scoreZoneRef.translation();

    switch (angle) {
      case 0: // Launch view
        get().mainCamera.position.set(0, 4.5, -4.4);
        get().orbitControlsRef.target.set(szt.x, szt.y, szt.z - 4);
        // get().mainCamera.rotation.set(
        //   MathUtils.degToRad(33),
        //   MathUtils.degToRad(-180),
        //   0
        // );
        break;
      case 1: // Launch view left
        get().mainCamera.position.set(-2, 4.5, -4.4);
        get().orbitControlsRef.target.set(szt.x - 1, szt.y, szt.z - 4);
        break;
      case 2: // Launch view right
        get().mainCamera.position.set(2, 4.5, -4.4);
        get().orbitControlsRef.target.set(szt.x + 1, szt.y, szt.z - 4);
        break;
      case 3: // top view
        get().mainCamera.position.set(0, 7.2, -0.1);
        get().orbitControlsRef.target.set(0, 0, 0);
        break;
      case 4: // score zone view
        get().mainCamera.position.set(szt.x, szt.y + 3, szt.z - 0.2);
        get().orbitControlsRef.target.set(szt.x, szt.y, szt.z);
        break;
      case 5: // capsule focus view
        const ct = get().capsuleRefs[0].translation();
        get().mainCamera.position.set(ct.x - 2, ct.y + 3, ct.z - 1.5);
        get().orbitControlsRef.target.set(ct.x, ct.y, ct.z);
        break;

      default:
        break;
    }
  },

  selectedLevel: "base",
  setLevel: (level) => set({ selectedLevel: level }),

  /* 
  0 : Nothing
  1 : Game start
  2 : During capsule shot
  3 : Capsule placement
  */
  gameState: 0,
  setGameState: (newGameState) => set({ gameState: newGameState }),

  players: [
    { slot: 1, name: "Player 1", capsuleSkin: playerColors[0], remaining: 0 },
  ],
  addPlayer: (optName = "") => {
    const newPlayers = [...get().players];
    const lth = newPlayers.length;
    if (lth < 4)
      newPlayers[lth] = {
        slot: lth + 1,
        name: optName,
        capsuleSkin: playerColors[lth],
        remaining: 0,
      };
    set({ players: newPlayers });
  },
  removePlayer: (playerSlot) => {
    const newPlayers = get().players.filter(
      (player) => player.slot !== playerSlot
    );
    newPlayers.map((player, index) => (player.slot = index + 1));
    set({ players: newPlayers });
  },
  setPlayers: (players) => set({ players: players }),
  onPlayerChange: (slot, newName) => {
    const newPlayers = [...get().players];
    const playerIndex = newPlayers.findIndex((player) => player.slot === slot);
    newPlayers[playerIndex] = { ...newPlayers[playerIndex], name: newName };
    set({ players: newPlayers });
  },
  playingPlayer: null,
  setPlayingPlayer: (player) => set({ playingPlayer: player }),

  nbCapsules: 3,
  setNbCapsules: (nbCapsules) => set({ nbCapsules: nbCapsules }),

  score: [0, 0, 0, 0],
  setScore: (newScore) => set({ score: newScore }),

  scoreToWin: 10,
  setScoreToWin: (value) => set({ scoreToWin: value }),

  gameWinner: null,
  setGameWinner: (player) => set({ gameWinner: player }),

  placementPlaneRef: null,
  setPlacementPlaneRef: (ref) => set({ placementPlaneRef: ref }),

  capsulePlaceholderRef: null,
  setCapsulePlaceholderRef: (ref) => set({ capsulePlaceholderRef: ref }),

  scoreZoneRef: null,
  setScoreZoneRef: (ref) => set({ scoreZoneRef: ref }),
  withinScoreZone: [],
  setWithinScoreZone: (capsule) => {
    const present = get().withinScoreZone.find(
      (cap) => capsule.userData.key === cap.userData.key
    );
    // have to check if already present since the onEnterScoreZone happens twice
    if (!present) {
      set({ withinScoreZone: [capsule, ...get().withinScoreZone] });
    }
  },
  removeWithinScoreZone: (capsuleKey) => {
    set({
      withinScoreZone: get().withinScoreZone.filter((inZoneCap) => {
        return inZoneCap.userData.key !== capsuleKey;
      }),
    });
  },
  checkWithingScoreZone: () => {
    return get().withinScoreZone.sort(
      (a, b) => b.translation().z - a.translation().z
    );
  },

  startGame: () => {
    const players = get().players;
    if (!players.length) {
      get().addPlayer("Player");
    }
    for (let i = 0; i < get().players.length; i++) {
      const player = get().players[i];
      player.name = player.name === "" ? "Player " + (i + 1) : player.name;
      player.remaining = get().nbCapsules;
    }
    get().setPlayingPlayer(players[0]);
    get().removeCapsule();
    get().setScore(get().players.map(() => 0));
    get().setTurn(1);
    get().setRound(1);
    get().setCameraAngle(3);
    get().setGameState(3);
  },

  turn: 0,
  setTurn: (newTurn) => set({ turn: newTurn }),
  determineNextPlayer: (inZoneCapsules) => {
    const currentPlayerSlot = get().playingPlayer.slot - 1; // Adjust slot to zero-based index
    const players = get().players;

    // Initialize the next player, current player if capsule remaining, otherwise next player in line
    let nextPlayer =
      players[currentPlayerSlot].remaining > 0
        ? players[currentPlayerSlot]
        : currentPlayerSlot === players.length - 1
          ? players[0]
          : players[currentPlayerSlot + 1];

    // console.log("============== nextPlayer", nextPlayer);

    // Iterate through all players starting from the current player
    for (let i = 1; i <= players.length; i++) {
      const playerIndex = (currentPlayerSlot + i) % players.length;
      const player = players[playerIndex];

      // console.log("Iterate next player -> ", player);

      // Check if the player has any capsules left to play
      const capsuleRemaining = player.remaining > 0;
      if (!capsuleRemaining) continue;

      // Prioritize players who haven't played any capsules in this round
      if (player.remaining === get().nbCapsules) {
        nextPlayer = player;
        break;
      }

      // nextPlayer has no capsule, no point of comparing
      if (!(nextPlayer.remaining > 0)) {
        nextPlayer = player;
        continue;
      }

      // Check if the player has a capsule in the score zone
      const bestCapsule = inZoneCapsules.find(
        (capsule) => capsule.userData.owner.slot === player.slot
      );

      // If the player has a capsule in the score zone and it's closer to the edge than the nextPlayer's capsule
      if (bestCapsule) {
        const nextPlayerBestCapsule = inZoneCapsules.find(
          (capsule) => capsule.userData.owner.slot === nextPlayer.slot
        );

        const bestCapsuleDistance = bestCapsule.translation().z;
        let nextPlayerBestCapsuleDistance = -Infinity;
        if (nextPlayerBestCapsule) {
          nextPlayerBestCapsuleDistance = nextPlayerBestCapsule.translation().z;
        }

        if (bestCapsuleDistance < nextPlayerBestCapsuleDistance) {
          nextPlayer = player;
        }
      } else {
        // If there are no capsules in the score zone, choose the next player with capsules left to play
        nextPlayer = player;
        break;
      }
    }

    return nextPlayer; //get().players.findIndex((player) => player.slot === nextPlayer.slot);
  },
  endTurn: () => {
    // Check if game started
    if (get().gameState > 0) {
      get().playingPlayer.remaining -= 1;

      const turnResult = get().checkWithingScoreZone();

      const capsulesRemain = get().players.some(
        (player) => player.remaining !== 0
      );

      // Players spend all their capsules this round, set next round
      if (!capsulesRemain) {
        const winCap = turnResult.length ? turnResult[0] : null;
        const roundWinner = winCap ? winCap.userData.owner.slot : undefined;
        // Count the points for this round
        let nbPoints = 0;
        if (winCap) {
          for (let i = 0; i < turnResult.length; i++) {
            if (turnResult[i].userData.owner.slot === roundWinner) nbPoints++;
            else break;
          }

          get().score[roundWinner - 1] =
            get().score[roundWinner - 1] + nbPoints;
        }

        const winner = get().score.find((sc) => sc >= get().scoreToWin);
        if (winner !== undefined) {
          get().setGameWinner(get().players[get().score.indexOf(winner)]);

          const gameData = {
            id: Date.now(),
            players: get().players.map((player) => player.name),
            winner: get().gameWinner.slot,
            score: get().score,
            turns: get().turn,
            round: get().round,
            nbCapsules: get().nbCapsules,
            scoreToWin: get().scoreToWin,
          };
          get().addToGameHistory(gameData);

          get().setGameState(5);
        } else {
          get().players.forEach((player) => {
            player.remaining = get().nbCapsules;
          });

          const firstToPlaySlot = get().score.reduce(
            (maxIndex, currentValue, currentIndex, array) => {
              return currentValue > array[maxIndex] ? currentIndex : maxIndex;
            },
            0
          );

          set({
            round: get().round + 1,
            endRoundMsg:
              "Manche " +
              get().round +
              " : " +
              (roundWinner
                ? get().players[roundWinner - 1].name +
                  " marque " +
                  nbPoints +
                  " point(s)"
                : "personne ne marque !"),
            playingPlayer: get().players[firstToPlaySlot],
            gameState: 3,
          });
          get().removeCapsule();
          get().setCameraAngle(3);
        }
      } else {
        const nextPlayer = get().determineNextPlayer(turnResult);
        set({
          endRoundMsg: "",
          playingPlayer: nextPlayer, //get().players[nextInLineSlot],
          turn: get().turn + 1,
          gameState: 3,
        });
        get().setCameraAngle(3);
      }
    }
  },

  round: 0,
  setRound: (newRound) => set({ round: newRound }),
  endRound: () => {},

  resetGame: () => {
    get().score.map((player) => (player = 0));
    get().setPlayingPlayer(get().players[0]);
    get().removeCapsule();
    get().setGameState(0);
  },

  endRoundMsg: "",
  setEndRoundMsg: (msg) => set({ endRoundMsg: msg }),

  isDragging: false,
  setIsDragging: (dragging) => set({ isDragging: dragging }),

  draggedCapsule: null,
  setDraggedCapsule: (dc) => set({ draggedCapsule: dc }),

  capsuleRefs: [],
  addCapsuleRef: (ref) => set({ capsuleRefs: [ref, ...get().capsuleRefs] }),
  capsules: [],
  addCapsule: (position) =>
    set({
      capsules: [
        ...get().capsules,
        {
          key: "capsule_" + Date.now(),
          owner: get().playingPlayer ? get().playingPlayer : get().players[0],
          position: position ? position : [-0.5 + Math.random(), 1.8, -2.5],
          color: get().playingPlayer
            ? get().playingPlayer.capsuleSkin
            : get().players[0].capsuleSkin, // "#" + Math.floor(Math.random() * 0xffffff).toString(16),
        },
      ],
    }),
  removeCapsule: () => {
    set({ withinScoreZone: [], capsuleRefs: [], capsules: [] });
  },
}));
