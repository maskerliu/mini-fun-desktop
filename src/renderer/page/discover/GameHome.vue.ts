// import { ipcRenderer } from "electron";
import { Toast } from "vant";
import { defineComponent } from "vue";
import { NavBarState } from "../../store/modules/interface";

const GameHome = defineComponent({
  name: "GameHome",
  data() {
    return {
      games: [
        { snap: "http://localhost:8000/game_snap_ship_war.png", title: "A* demo", schema: "/discover/AStarDemo", md5: "7d315e5dae65be457722e8dc396b3c95" },
        { snap: "http://localhost:8000/game_snap_tank.png", title: "坦克大战", resource: "", md5: "f072491af9cb9e57a0155e33b06cf74a" },
        { snap: "http://localhost:8000/game_snap_fish.png", title: "养鱼", resource: "", md5: "" },
        { snap: "http://localhost:8000/game_snap_race.png", title: "赛车", resource: "", md5: "" },
        { snap: "http://localhost:8000/game_snap_robot_race.png", title: "疯狂机器人赛车", resource: "", md5: "" },
        { snap: "http://localhost:8000/game_snap_ship_war.png", title: "大海战", resource: "http://localhost:8000/shipwar.zip", md5: "7d315e5dae65be457722e8dc396b3c95" },
        { snap: "http://localhost:8000/game_snap_sokoban.png", title: "sokoban", resource: "", md5: "" },
        { snap: "http://localhost:8000/game_snap_sokoban1.png", title: "sokoban1", resource: "", md5: "" }
      ],
      isLoading: false,
      finished: false,
    }
  },
  created(): void {

  },
  mounted(): void {
    // this.onRefresh();
    let navBarState: NavBarState = {
      title: "探索",
      showLeft: false,
      showRight: false,
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        for (let i = 0; i < 10; i++) {
          this.games.push(this.games.length + 1);
        }

        // 加载状态结束
        this.isLoading = false;

        // 数据全部加载完成
        if (this.games.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onItemClick(item: any) {

      if (item.schema) {
        console.log(item.schema, this.$router);
        this.$router.replace("/discover/AStarDemo");
      }
      // ipcRenderer.send("on-open-game", Object.assign({}, item));
    }
  },


});

export default GameHome