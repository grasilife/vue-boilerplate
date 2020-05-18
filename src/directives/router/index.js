import router from "./router";

const install = function(Vue) {
  Vue.directive("router", router);
};

if (window.Vue) {
  window["router"] = router;
  Vue.use(install); // eslint-disable-line
}

router.install = install;
export default router;
