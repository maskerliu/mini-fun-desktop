import { Toast } from 'vant';
import { defineComponent } from 'vue';
import { NavBarState } from '../../../store/modules/interface';
import { GridNode } from '../astar/Graph';
import GMap from './GMap';
import GPlayer, { GPlayerType } from './GPlayer';
import GPlayerUnit, { GPlayerUnitType } from './GPlayerUnit';

import './GControl.css';
import './GMap.css';
import './GInstallation.css';
import './GPlayerUnit.css';

const AStarDemo = defineComponent({
  name: "",
  data() {
    return {
      mapRow: 19,
      mapCol: 33,
      wallDensity: 10,
      checkShowGrid: false,
      checkShowPath: false,
      checkMultiWeight: false,
      checkDebug: false,
      searchDiagonal: false,
      checkClosest: false,
      generateWeights: false,
      displayWeights: false,
      battleSence: null,
      startPos: GridNode,
      destPos: GridNode,
      units: [],
      gMap: null,
      mapWidth: 0,
      mapHeight: 0,
      mapTileWidth: 32,
      mapTileHeight: 32,
      is_show_mask: false,
      start_x: 0,
      start_y: 0,
      end_x: 0,
      end_y: 0,
      player: null,
    }
  },
  created() {
    this.gMap = new GMap();
    this.player = new GPlayer("111111", "张三丰", GPlayerType.Blue);
  },
  mounted() {
    let navBarState: NavBarState = {
      title: "A* Demo",
      showLeft: true,
      showRight: false,
    };
    this.$store.dispatch("updateNavBar", navBarState);
    this.onGenerateMapClicked();
    this.battleSence = document.querySelector(".battle_sence");
  },
  methods: {
    onGenerateMapClicked() {
      this.mapWidth = this.mapTileWidth * this.mapCol;
      this.mapHeight = this.mapTileHeight * this.mapRow;
      this.gMap.clean();
      setTimeout(() => {
        this.gMap.tileWidth = this.mapTileWidth;
        this.gMap.tileHeight = this.mapTileHeight;
        this.gMap.generateMap(this.mapRow, this.mapCol, this.mapTileWidth, this.mapTileHeight, this.wallDensity, this.checkClosest);
      }, 50);
    },
    updateWarFog() {
      // let offsetX = this.players[this.curPlayer].startPos.y * MAP_TILE_WIDTH;
      // let offsetY = this.players[this.curPlayer].startPos.x * MAP_TILE_HEIGHT;
      // let mapSize = this.mapWidth > this.mapHeight ? this.mapWidth : this.mapHeight;
      // this.$refs.warFog.style.top = (this.mapHeight / 4 - 100 - offsetY) + "px";
      // this.$refs.warFog.style.left = (this.mapWidth / 4 - 100 - offsetX) + "px";
      // this.$refs.warFog.style.boxShadow = `${offsetX}px ${offsetY}px 0 ${mapSize / 4 }px #3a3939c4`;
    },
    setDest(row: number, col: number) {
      if (this.gMap.isObstacle(row, col)) {
        Toast('cant set dest on wall');
        return;
      }

      this.player.units.forEach((unit: GPlayerUnit, index: number) => {
        if (unit.isSelected) { unit.setDest(row, col); }
      });
    },
    onStop() {
      this.player.units.forEach((unit: GPlayerUnit, index: number) => {
        if (unit.isSelected) { unit.stopAnim(); }
      });
    },
    mask_width(): string {
      return `${Math.abs(this.end_x - this.start_x)}px`;
    },
    mask_height(): string {
      return `${Math.abs(this.end_y - this.start_y)}px`;
    },
    mask_left(): string {
      return `${Math.min(this.start_x, this.end_x)}px`;
    },
    mask_top(): string {
      return `${Math.min(this.start_y, this.end_y)}px`;
    },
    onMouseDown(event: MouseEvent) {
      if (event.button === 2) { // 右键
        this.setDest(Math.floor((event.clientY - this.battleSence.getBoundingClientRect().top) / this.mapTileHeight),
          Math.floor((event.clientX - this.battleSence.getBoundingClientRect().left) / this.mapTileWidth));
        event.preventDefault();
      } else {
        // this.players.forEach((player: GPlayer, index: number) => { player.isSelected = false; });
        this.is_show_mask = true;
        this.start_x = event.clientX;
        this.start_y = event.clientY;
        this.end_x = event.clientX;
        this.end_y = event.clientY;
        this.battleSence.addEventListener('mousemove', this.onMouseMove);
        this.battleSence.addEventListener('mouseup', this.onMouseUp);
      }
    },
    onMouseMove(event: any) {
      if (event.button === 2) { // 右键
      } else {
        this.end_x = event.clientX;
        this.end_y = event.clientY;
      }
    },
    onMouseUp(event: any) {
      if (event.button === 2) { // 右键
      } else {
        this.battleSence.removeEventListener('mousemove', this.handleMouseMove);
        this.battleSence.removeEventListener('mouseup', this.handleMouseUp);
        this.is_show_mask = false;
        this.handlePlayerSelect();
        this.resSetXY();
      }
    },
    handlePlayerSelect() {
      const dom_mask: HTMLElement = document.querySelector('.mask');
      // const rect_select = dom_mask.getClientRects()[0];
      let rect_select = { x: this.start_x, y: this.start_y, width: this.end_x - this.start_x, height: this.end_y - this.start_y };
      this.player.units.forEach((unit: GPlayerUnit, index: number) => {
        const rect = unit.elPlayer.getClientRects()[0];
        unit.isSelected = this.collide(rect, rect_select);
      });
    },
    collide(rect1: any, rect2: any): boolean {
      const maxX: number = Math.max(rect1.x + rect1.width, rect2.x + rect2.width);
      const maxY: number = Math.max(rect1.y + rect1.height, rect2.y + rect2.height);
      const minX: number = Math.min(rect1.x, rect2.x);
      const minY: number = Math.min(rect1.y, rect2.y);
      if (maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height) {
        return true;
      } else {
        return false;
      }
    },
    resSetXY() {
      this.start_x = 0;
      this.start_y = 0;
      this.end_x = 0;
      this.end_y = 0;
    },
    onGenerateUnit(type: GPlayerUnitType) {
      this.player.generateUnit(type, this.gMap);
      setTimeout(() => {
        this.player.units.forEach((unit: GPlayerUnit, index: number) => {
          unit.bindAvatar(document.querySelector(`#${unit.id}`), 0);
        });
      }, 50);
    }
  }
});

export default AStarDemo;