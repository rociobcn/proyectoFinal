import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import './index.css'
import Swal from 'sweetalert2'

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");

