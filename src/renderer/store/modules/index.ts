import { ModuleTree } from "vuex";
import BizMain from "./BizMain";
import MsgCenter from "./message";
import Settings from "./settings";

const modules: ModuleTree<any> = { BizMain, MsgCenter, Settings };

export default modules;
