<template>
  <van-row class="full-row" @contextmenu.prevent="">
    <van-col class="battle_sence_settings" span="5">
      <van-button
        plain
        size="small"
        @click="onGenerateMapClicked"
        style="width: 100%"
      >
        Generate New Map
      </van-button>
      <br />
      <br />
      <br />
      <fieldset>
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
      <fieldset>
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
      <van-checkbox v-model="checkShowGrid" shape="square">
        Show map grid?
      </van-checkbox>
      <br />
      <van-checkbox v-model="checkDebug" shape="square">
        Show debug info?
      </van-checkbox>
      <br />
      <van-checkbox v-model="checkShowPath" shape="square">
        Show search path?
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
      <fieldset>
        <legend>Weight:</legend>
        <van-cell center title="开启多weight模式">
          <template #right-icon>
            <van-switch v-model="checkMultiWeight" size="20" />
          </template>
        </van-cell>
        <br />
        <div class="weight_setting_row">
          <span class="grid_item weight1"></span>
          Weight of 1
        </div>
        <br />
        <div class="weight_setting_row">
          <span class="grid_item weight3" id="keyWeight3"></span>
          Weight of 3
        </div>
        <br />
        <div class="weight_setting_row">
          <span class="grid_item weight5"></span>
          Weight of 5
        </div>
        <br />
        <div class="weight_setting_row">
          <span class="grid_item wall" id="keyWall"></span>
          Wall (imapassable)
        </div>
      </fieldset>
      <br />
    </van-col>

    <van-col span="19" align="center">
      <div
        class="battle_sence"
        v-bind:style="{
          width: mapCol * mapTileWidth + 1 + 'px',
          height: mapRow * mapTileHeight + 'px',
        }"
        @mousedown="onMouseDown"
      >
        <div class="installation born_point"></div>
        <div class="installation maintain_area"></div>
        <div class="installation safe_area active"></div>
        <div
          class="unit"
          v-for="(unit, idx) in player.units"
          :key="idx"
          :id="unit.id"
        >
          <div class="unit_selected" v-show="unit.isSelected"></div>
          <div
            class="unit_profile unit_sprite"
            v-bind:class="[`${unit.avatar}`]"
            v-bind:style="{
              zoom: unit.zoom,
            }"
          ></div>
          <span class="unit_range" v-if="unit.type == 1"></span>
          <div class="unit_hp_bar" align="left">
            <div class="unit_hp_bar hp"></div>
          </div>
        </div>
        <!-- <div class="war-fog" ref="warFog"></div> -->

        <div class="map_row" v-for="(row, idx) in gMap.mapInfo" :key="idx">
          <span
            v-for="(item, idy) in row"
            :key="idy"
            class="grid_item"
            v-bind:class="[
              `${gMap.mapStyles[idx][idy]}`,
              {
                map_obj_sprite: item <= 0,
              },
            ]"
            v-bind:style="{
              width: item > 0 ? mapTileWidth - 2 + 'px' : '80px',
              height: item > 0 ? mapTileHeight - 2 + 'px' : '80px',
              zoom: item <= 0 ? (mapTileWidth - 2) / 80 : 1,
              'border-color': checkShowGrid ? 'lightgray' : 'transparent',
            }"
          >
            {{ checkDebug ? item : "" }}
            <span class="vector" v-show="checkDebug && item > 0"></span>
          </span>
        </div>

        <div class="battle_sence mask" v-show="false"></div>
      </div>
      <van-row class="control_panel" align="left">
        <van-col>
          <br />
          <span>张三</span>
          <br /><br />
          <span class="gold_icon"></span>
          <span style="font-size: 0.7rem">1000</span>
        </van-col>
        <van-col style="display: flex">
          <div class="unit_snap" @click="onGenerateUnit(0)" align="center">
            <span
              class="unit_sprite"
              v-bind:class="[`tank_${player.type}`]"
              style="zoom: 0.25; margin: 30px"
            ></span>
            <span class="unit_cost">500</span>
          </div>
          <div class="unit_snap" @click="onGenerateUnit(1)">
            <span
              class="unit_sprite"
              v-bind:class="[`medical_${player.type}`]"
              style="zoom: 0.25; margin: 30px"
            ></span>
            <span class="unit_cost">400</span>
          </div>
          <div class="unit_snap" @click="onGenerateUnit(2)">
            <span
              class="unit_sprite plane_light"
              style="zoom: 0.25; margin: 30px"
            ></span>
            <span class="unit_cost">1500</span>
          </div>
          <div class="unit_snap" @click="onGenerateUnit(3)" align="center">
            <span
              class="unit_sprite"
              v-bind:class="[`soldier_${player.type}`]"
              style="zoom: 0.5; margin: 15px"
            ></span>
            <span class="unit_cost">200</span>
          </div>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script lang="ts" src="./AStarDemo.vue.ts"></script>
<style scoped>
fieldset {
  border: lightgrey dashed 1px;
}
.battle_sence_settings {
  height: 100%;
  padding: 10px;
  font-size: 0.8rem;
  overflow: auto;
}

.weight_setting_row {
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
}

/* .control_panel.unit_snap:hover {
  background-color: #b65901;
} */
</style>