import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import base from "./assets/utils/base";
import { Button, Loading } from "vant";
import { Cell, CellGroup } from "vant";
import { Image } from "vant";
import { Row, Col } from "vant";
import { Popup, Field } from "vant";
import { List } from "vant";
import { AddressEdit } from "vant";
import { Area, Overlay, Picker } from "vant";
import { AddressList, Icon } from "vant";
import { Swipe, SwipeItem } from "vant";
import { NavBar, Stepper, Toast } from "vant";
// import VConsole from "vconsole";
// new VConsole();

Vue.use(Icon);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(Picker);
Vue.use(Field);
Vue.use(Stepper);
Vue.use(NavBar);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Popup);
Vue.use(Row).use(Col);
Vue.use(Image);
// Vue.use(Cell).use(CellGroup);
Vue.use(Button);
Vue.use(base);
Vue.use(Toast);
Vue.use(List);
Vue.use(AddressEdit);
Vue.use(Area);
Vue.use(AddressList);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
