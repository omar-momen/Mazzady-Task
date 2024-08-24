import _AOS from "aos";
import "aos/dist/aos.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueSweetalert2);

  const AOS = _AOS.init();

  return {
    provide: {
      Swal: vueApp.config.globalProperties.$swal,
      AOS,
    },
  };
});
