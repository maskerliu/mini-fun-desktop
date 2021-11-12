import { ipcRenderer } from "electron";
import { defineComponent } from "vue";
import Parser from "rss-parser";
import { NavBarState } from "../../store/modules/interface";


const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const RecommendFeeds = defineComponent({
  name: "RecommendFeeds",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    }
  },

  created(): void {

  },

  mounted(): void {
    let navBarState: NavBarState = {
      title: "推荐",
      showLeft: false,
      showRight: false,
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 1000);
    },
  },

});

export default RecommendFeeds