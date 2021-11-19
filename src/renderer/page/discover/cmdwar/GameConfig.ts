// 游戏单位数值
export default {
  mapTileWidth: 32,
  mapTileHeight: 32,
  Unit_Width: 50,
  Unit_Height: 50,
  Tank: {
    damage: 50,
    range: 100,
    hp: 100,
    cost: 500
  },
  Medical: {
    damge: 0,
    range: 200,
    hp: 80,
    cost: 300
  },
  Plane: {
    damge: 100,
    range: 200,
    hp: 50,
    cost: 1000
  },
  Human: {
    damge: 20,
    range: 100,
    hp: 30,
    cost: 100
  },
  Player_0: { // beige
    tank: "tank_0",
    medical: "medical_0",
    plane: "plane_heavy",
    human: "human_0"
  },
  Player_1: { // blue
    tank: "tank_1",
    medical: "medical_1",
    plane: "plane_heavy",
    human: "human_1"
  },
  Player_2: { // green
    tank: "tank_2",
    medical: "medical_2",
    plane: "plane_light",
    human: "human_2"
  },
  Player_3: { // red
    tank: "tank_3",
    medical: "medical_3",
    plane: "plane_light",
    human: "human_3"
  },
};