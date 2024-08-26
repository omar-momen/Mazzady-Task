import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueSweetalert2);

  return {
    provide: {
      Swal: vueApp.config.globalProperties.$swal,
    },
  };
});
