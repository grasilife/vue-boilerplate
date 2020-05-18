import auth from "@/constants/auth.js";
export default function(menu) {
  let userName = JSON.parse(sessionStorage.getItem("userName"));
  let role = userName.roleList[0].id;
  let authName = "";
  // 根据roleId或者角色
  for (let i = 0; i < auth.length; i++) {
    let authId = auth[i].authId;
    if (authId == role) {
      authName = auth[i].authName;
    }
  }

  let routes = [];
  for (let i = 0; i < menu.length; i++) {
    //一级鉴权
    let parent = menu[i];
    let obj = {
      path: parent.path,
      name: parent.name,
      title: parent.title,
      auth: parent.auth,
      redirect: parent.redirect
    };
    let userAuth = menu[i].auth;
    let userAuthState = userAuth.indexOf(authName);
    if (userAuthState != -1) {
      routes.push(obj);
      let length = routes.length;
      let index = length - 1;
      // 二级鉴权
      if (parent.children != undefined) {
        routes[length - 1].children = [];
        for (let j = 0; j < parent.children.length; j++) {
          let children = parent.children[j];
          let obj2 = {
            path: children.path,
            name: children.name,
            title: children.title,
            component: children.component,
            auth: children.auth
          };
          let userAuthChildren = children.auth;
          let authState = userAuthChildren.indexOf(authName);
          if (authState != -1) {
            routes[index].children.push(obj2);
          }
          // 添加到数组的最后一个
        }
      }
    }
  }
  return routes;
}
