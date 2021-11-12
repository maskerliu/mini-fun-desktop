<template>
  <van-row class="full-row">
    <van-col
      span="6"
      style="height: 100%; padding: 10px; font-size: 0.8rem; overflow: auto"
    >
      <fieldset style="border: lightgrey dashed 1px">
        <legend>Map:</legend>
        <van-field
          v-model="mapTileWidth"
          label="tile width"
          placeholder="input number"
          input-align="right"
        />
        <br />
        <van-field
          v-model="mapTileHeight"
          label="tile height"
          placeholder="input number"
          input-align="right"
        />
        <br />
        <van-field
          v-model="mapRow"
          label="map row"
          placeholder="input number"
          input-align="right"
        />
        <br />
        <van-field
          v-model="mapCol"
          label="map col"
          placeholder="input number"
          input-align="right"
        />
      </fieldset>
      <br />
      <fieldset style="border: lightgrey dashed 1px">
        <legend>Wall density:</legend>
        <br />
        <van-slider
          v-model="wallDensity"
          :step="0.5"
          max="10"
          min="2.5"
          bar-height="8"
          button-size="20"
          style="width: 230px; padding: 10px"
        />
        <br />
      </fieldset>
      <br />
      <fieldset style="border: lightgrey dashed 1px">
        <legend>Weight:</legend>
        <van-cell center title="开启多weight模式">
          <template #right-icon>
            <van-switch v-model="checkMultiWeight" size="20" />
          </template>
        </van-cell>
        <br />
        <div style="height: 20px; line-height: 20px; vertical-align: middle">
          <span
            class="grid_item weight1"
            style="width: 16px; height: 16px; margin-right: 6px"
            id="keyWeight3"
          ></span>
          Weight of 1
        </div>
        <br />
        <div style="height: 20px; line-height: 20px; vertical-align: middle">
          <span
            class="grid_item weight3"
            style="width: 16px; height: 16px; margin-right: 6px"
            id="keyWeight3"
          ></span>
          Weight of 3
        </div>
        <br />
        <div style="height: 20px; line-height: 20px; vertical-align: middle">
          <span
            class="grid_item weight5"
            style="width: 16px; height: 16px; margin-right: 6px"
            id="keyWeight3"
          ></span>
          Weight of 5
        </div>
        <br />
        <div style="height: 20px; line-height: 20px; vertical-align: middle">
          <span
            class="grid_item wall"
            style="width: 14.25px; height: 14.25px; margin-right: 6px"
            id="keyWall"
          ></span>
          Wall (imapassable)
        </div>
      </fieldset>
      <br />
      <van-checkbox v-model="checkShowPath" shape="square">
        Show search path?
      </van-checkbox>
      <br />
      <van-checkbox v-model="checkDebug" shape="square">
        Show search info?
      </van-checkbox>
      <br />
      <van-checkbox v-model="searchDiagonal" shape="square">
        Allow diagonal movement?
      </van-checkbox>
      <br />
      <van-checkbox v-model="checkClosest" shape="square">
        Closest node if target unreachable?
      </van-checkbox>
      <br />
      <van-checkbox v-model="generateWeights" shape="square">
        Add random weights?
      </van-checkbox>
      <br />
      <van-checkbox v-model="displayWeights" shape="square">
        Display weight values?
      </van-checkbox>
      <br />
      <van-button
        type="success"
        @click="onGenerateMapClicked"
        style="width: 100%"
      >
        Generate New Map
      </van-button>
      <br />
    </van-col>
    <van-col span="18" class="map_grid">
      <div
        class="player"
        v-for="(player, idx) in players"
        :key="idx"
        :id="player.id"
      >
        <div class="player hp-bar">
          <div class="player hp-bar hp"></div>
        </div>
        <br />

        <div class="player-profile" @click="onPlayerSelected(idx)">
          <span class="player-profile scan"></span>
          <span
            v-bind:class="[{ 'player-profile selected': player.isSelected }]"
          ></span>
          <div
            class="player-profile tank"
            v-bind:style="{
              background: `url(/static/game/${player.type}.png) no-repeat`,
              'background-size': '100% 100%',
            }"
          ></div>
          <span class="player-profile smoke"></span>
          <span class="player-profile smoke1"></span>
          <span class="player-profile smoke2"></span>
        </div>
      </div>

      <div class="player" style="top: 508px; left: 501px">
        <div class="player hp-bar">
          <div class="player hp-bar hp"></div>
        </div>
        <br />

        <div class="player-profile">
          <span class="player-profile scan"></span>
          <span
            class="player-profile avatar"
            v-bind:style="{
              'border-color': 'green',
              'border-right-color': 'transparent',
            }"
          ></span>
          <span
            class="player-profile avatar"
            v-bind:style="{
              'border-color': 'green',
              'border-right-color': 'transparent',
            }"
          ></span>
        </div>
      </div>
      <!-- <span class="grid_item yin-yang"></span> -->
      <!-- <span class="pacman space-invader"></span> -->
      <!-- <div class="war-fog" ref="warFog"></div> -->
      <div class="clear" v-for="(row, idx) in gMap.mapInfo" :key="idx">
        <span
          v-for="(item, idy) in row"
          :key="idy"
          class="grid_item"
          v-bind:style="{
            width: `${mapTileWidth - 2}px`,
            height: `${mapTileHeight - 2}px`,
          }"
          v-bind:class="[
            {
              wall: item === 0,
              weight1: item === 1,
              weight3: item === 3,
              weight5: item === 5,
            },
          ]"
          @contextmenu.prevent="setDest(idx, idy)"
        ></span>
      </div>
    </van-col>
  </van-row>
</template>

<script lang="ts" src="./AStarDemo.vue.ts"></script>
<style scoped>
.clear:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.war-fog {
  pointer-events: none;
  position: absolute;
  top: 160px;
  left: 60px;
  background: transparent;
  border: 100px solid transparent;
  border-radius: 50%;
  box-shadow: 200px 100px 10px 420px #3a3939c4;
}

.map_grid {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  background: url(/static/game/dirt.png);
  /* background-size: 100%; */
}

.grid_item {
  width: 30px;
  height: 18px;
  display: block;
  border: 1px solid lightgray;
  float: left;
  line-height: 30px;
  font-size: 10px;
}
.grid_item.wall {
  background: url(/static/game/sandBag_beige.png) no-repeat;
  background-size: 100%;
  background-position: center;
}
.grid_item.weight1 {
  background-color: #ffffff00;
}
.grid_item.weight3 {
  background-color: #d6eaff;
}
.grid_item.weight5 {
  background-color: #abd1ff;
}
.grid_item.start {
  background-color: #ff703f;
}
.grid_item.dest {
  background-color: #2a7a42;
}
.grid_item.road {
  background-color: #f5d02f;
}
.grid_item:hover {
  background: transparent;
  position: relative;
  cursor: pointer;
}
.grid_item:hover::before {
  background: red;
  content: "";
  width: 2px;
  height: calc(100% - 2px);
  top: 1px;
  left: calc(50% - 2px);
  position: absolute;
}
.grid_item:hover:after {
  background: red;
  content: "";
  width: calc(100% - 2px);
  height: 2px;
  position: absolute;
  top: calc(50% - 1px);
  left: 1px;
}
.grid_item.yin-yang {
  width: 52px;
  height: 26px;
  background: #eee;
  border-color: grey;
  border-style: solid;
  border-width: 2px 2px 26px 2px;
  border-radius: 100%;
  position: absolute;
  animation: flash_blink 3s linear infinite;
  right: 50px;
}
.grid_item.yin-yang:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0px;
  background: #eee;
  border: 10px solid grey;
  border-radius: 100%;
  width: 6px;
  height: 6px;
}
.grid_item.yin-yang:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background: grey;
  border: 10px solid #eee;
  border-radius: 100%;
  width: 6px;
  height: 6px;
}

.player {
  width: 50px;
  height: 50px;
  position: fixed;
  /* background: rgba(45, 56, 54, 0.623); */
  margin: -10px;
}

.player.hp-bar {
  width: 44px;
  height: 4px;
  position: relative;
  border: 2px solid gray;
  border-radius: 2px;
  margin: 0 3px;
  background: rgb(58, 57, 57);
}
.player.hp-bar.hp {
  width: 50%;
  height: 4px;
  background: #d82727;
  border: 0px solid lightgray;
  margin: 0;
}

.player-profile {
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 50%;
  /* background: rgba(204, 85, 29, 0.548); */
  top: 5px;
  left: 5px;
}

.player-profile.selected {
  width: 32px;
  height: 32px;
  position: absolute;
  border: 2px dashed rgb(27, 224, 27);
  border-radius: 50%;
  top: 2px;
  left: 2px;
  /* animation: rotate_cycle 2.5s linear infinite; */
}

.player-profile.scan {
  width: 0;
  height: 0;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-top: 100px solid rgba(0, 255, 55, 0.25);
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  position: absolute;
  animation: rotate_scan 1.5s linear infinite;
  transform-origin: 50% 100%;
  top: -81px;
  left: -53px;
  pointer-events: none;
}

.player-profile.avatar {
  width: 0px;
  height: 0px;
  border: 10px solid;
  border-color: rgb(231, 209, 9);
  border-right: 10px solid transparent;
  border-right-color: transparent;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
}
.player-profile.avatar:nth-child(3) {
  animation: rotate_up 0.5s infinite;
}
.player-profile.avatar:nth-child(4) {
  animation: rotate_down 0.5s infinite;
}

.player-profile.tank {
  width: 30px;
  height: 30px;
  background: url(/static/game/tank_green.png) no-repeat;
  background-size: 100%;
}

.player-profile.smoke {
  width: 8px;
  height: 8px;
  top: 15px;
  left: -1px;
  background: url(/static/game/smoke_white.png) no-repeat;
  background-size: 100% 100%;
  animation: smoke 0.6s both 0s ease-out infinite;
}

.player-profile.smoke1 {
  width: 8px;
  height: 8px;
  top: 11px;
  left: 0px;
  background: url(/static/game/smoke_white.png) no-repeat;
  background-size: 100% 100%;
  animation: smoke1 0.6s both 0s linear infinite;
}

.player-profile.smoke2 {
  width: 8px;
  height: 8px;
  top: 16px;
  left: 5px;
  background: url(/static/game/smoke_white.png) no-repeat;
  background-size: 100% 100%;
  animation: smoke2 0.6s both 0s linear infinite;
}

@keyframes rotate_up {
  0% {
    transform: rotate(-90deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}
@keyframes rotate_down {
  0% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
@keyframes rotate_scan {
  0% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(135deg);
  }
  100% {
    transform: rotate(45deg);
  }
}
@keyframes rotate_cycle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes flash_blink {
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  25% {
    opacity: 0.5;
    transform: rotate(90deg);
  }
  50% {
    opacity: 1;
    transform: rotate(180deg);
  }
  75% {
    opacity: 0.5;
    transform: rotate(270deg);
  }
  100% {
    opacity: 0;
    transform: rotate(360deg);
  }
}

@keyframes smoke {
  from {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate(-30px, 0px) scale(2.5);
    opacity: 0.3;
  }
}
@keyframes smoke1 {
  from {
    transform: translate(5, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate(-20px, 0px) scale(2);
    opacity: 0.3;
  }
}
@keyframes smoke2 {
  from {
    transform: translate(10, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate(-10px, 0px) scale(1.5);
    opacity: 0.3;
  }
}

.egg {
  display: block;
  width: 126px;
  height: 180px;
  background-color: red;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}

.pacman.space-invader {
  box-shadow: 0 0 0 1em red, 0 1em 0 1em red, -2.5em 1.5em 0 0.5em red,
    2.5em 1.5em 0 0.5em red, -3em -3em 0 0 red, 3em -3em 0 0 red,
    -2em -2em 0 0 red, 2em -2em 0 0 red, -3em -1em 0 0 red, -2em -1em 0 0 red,
    2em -1em 0 0 red, 3em -1em 0 0 red, -4em 0 0 0 red, -3em 0 0 0 red,
    3em 0 0 0 red, 4em 0 0 0 red, -5em 1em 0 0 red, -4em 1em 0 0 red,
    4em 1em 0 0 red, 5em 1em 0 0 red, -5em 2em 0 0 red, 5em 2em 0 0 red,
    -5em 3em 0 0 red, -3em 3em 0 0 red, 3em 3em 0 0 red, 5em 3em 0 0 red,
    -2em 4em 0 0 red, -1em 4em 0 0 red, 1em 4em 0 0 red, 2em 4em 0 0 red;

  position: absolute;
  background: red;
  width: 1em;
  height: 1em;
  overflow: hidden;
  margin: 50px 0 70px 65px;
  top: 100px;
  right: 80px;
}
</style>