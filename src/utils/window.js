const windowForbid = function(){//禁止浏览器缩放
    window.addEventListener(
        "mousewheel",
        function (event) {
          if (event.ctrlKey === true || event.metaKey) {
            event.preventDefault();
          }
        },
        { passive: false }
      );
    
      //firefox
      window.addEventListener(
        "DOMMouseScroll",
        function (event) {
          if (event.ctrlKey === true || event.metaKey) {
            event.preventDefault();
          }
        },
        { passive: false }
      );
}
export default windowForbid