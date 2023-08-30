import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/user";
import ElementUI, { Message } from "element-ui";
import i18n from "./lang/index";
import "element-ui/lib/theme-chalk/index.css";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

Vue.use(VXETable);

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.directive("drag", (el) => {
  const oDiv = el; // 当前元素
  const minTop = oDiv.getAttribute("drag-min-top"); //用以获取HTML元素的属性
  const ifMoveSizeArea = 20;
  oDiv.onmousedown = (e) => {
    let target = oDiv;
    while (
      window.getComputedStyle(target).position !== "absolute" &&
      target !== document.body
    ) {
      target = target.parentElement;
    }

    document.onselectstart = () => {
      return false;
    };
    if (!target.getAttribute("init_x")) {
      target.setAttribute("init_x", target.offsetLeft);
      target.setAttribute("init_y", target.offsetTop);
    }

    const initX = parseInt(target.getAttribute("init_x"));
    const initY = parseInt(target.getAttribute("init_y"));

    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - target.offsetLeft;
    const disY = e.clientY - target.offsetTop;
    document.onmousemove = (e) => {
      // 通过事件委托，计算移动的距离
      // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
      const l = e.clientX - disX;
      const t = e.clientY - disY;
      // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
      target.style.left = l + "px";
      target.style.top = (t < minTop ? minTop : t) + "px";
      if (
        Math.abs(l - initX) > ifMoveSizeArea ||
        Math.abs(t - initY) > ifMoveSizeArea
      ) {
        target.setAttribute("dragged", "");
      } else {
        target.removeAttribute("dragged");
      }
    };
    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.onselectstart = null;
    };
    // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
    return false;
  };
});

Vue.directive("dragWidth", {
  bind(el, binding) {
    let startX, startY;
    let initialWidth, initialHeight;
    let originalCursor;

    const handleMouseMove = (event) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      let width = initialWidth + dx;
      let height = initialHeight + dy;

      const { clientWidth: containerWidth, clientHeight: containerHeight } =
        el.parentNode;

      if (width > containerWidth) {
        width = containerWidth;
        el.style.borderRightColor = "red";
      } else {
        el.style.borderRightColor = "";
      }

      if (height > containerHeight) {
        height = containerHeight;
        el.style.borderBottomColor = "red";
      } else {
        el.style.borderBottomColor = "";
      }

      el.style.width = width + "px";
      el.style.height = height + "px";
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      el.style.cursor = originalCursor;
    };

    el.addEventListener("mousedown", (event) => {
      startX = event.clientX;
      startY = event.clientY;
      initialWidth = el.offsetWidth;
      initialHeight = el.offsetHeight;
      originalCursor = el.style.cursor;

      el.style.cursor = "move";

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
  },
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
Vue.config.errorHandler = function (err) {
  Message.error("出错了");
};
