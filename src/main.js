import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import './index.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'animate.css';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

const pinia = createPinia();
createApp(App).use(router).use(pinia).use(VueSweetalert2).use(VCalendar, {}).mount("#app");

