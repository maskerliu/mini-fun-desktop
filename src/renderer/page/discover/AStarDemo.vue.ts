import { Toast } from 'vant';
import { defineComponent } from 'vue';
import { NavBarState } from '../../store/modules/interface';
import { GridNode } from './astar/Graph';
import GMap from './GMap';
import GPlayer from './GPlayer';

const AStarDemo = defineComponent({
  name: "",
  data() {
    return {
      mapRow: 37,
      mapCol: 23,
      wallDensity: 10,
      checkShowPath: false,
      checkMultiWeight: false,
      checkDebug: false,
      searchDiagonal: false,
      checkClosest: false,
      generateWeights: false,
      displayWeights: false,
      startPos: GridNode,
      destPos: GridNode,
      players: [],
      pathBreak: false,
      gMap: null,
      mapWidth: 0,
      mapHeight: 0,
      mapTileWidth: 32,
      mapTileHeight: 32,
      curPlayer: 0
    }
  },
  created() {
    this.gMap = new GMap();
  },
  mounted() {
    let navBarState: NavBarState = {
      title: "A* Demo",
      showLeft: true,
      showRight: false,
    };
    this.$store.dispatch("updateNavBar", navBarState);
    this.onGenerateMapClicked();

    this.generatePlayer();
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
        this.generatePlayer();
      }, 50);
    },
    onPlayerSelected(idx: number) {
      this.players[this.curPlayer].isSelected = false;
      this.curPlayer = idx;
      this.players[idx].isSelected = true;

      this.updateWarFog();
    },
    generatePlayer() {
      this.players = [];
      let player = new GPlayer(new GridNode(1, 2, 0), "张三", "tank_green", 100, this.gMap); // green
      player.isSelected = true;
      this.players.push(player);
      player = new GPlayer(new GridNode(5, 5, 0), "莉丝", "tank_blue", 50, this.gMap); // yellow
      this.players.push(player);
      // player = new GPlayer(new GridNode(10, 40, 0), "玩物", "#ff703f", 10,this.gMap); // orange
      // this.players.push(player);
      // player = new GPlayer(new GridNode(30, 35, 0), "玩物", "#ff703f", 80, this.gMap); // orange
      // this.players.push(player);

      setTimeout(() => {
        for (let i = 0; i < this.players.length; ++i) {
          this.players[i].bindAvatar(document.querySelector(`#${this.players[i].id}`));
        }
      }, 50);
      this.updateWarFog();
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
      if (this.gMap.isWall(row, col)) {
        Toast('cant set dest on wall');
        return;
      }
      this.players[this.curPlayer].setDest(row, col);
    }
  }
});

export default AStarDemo;