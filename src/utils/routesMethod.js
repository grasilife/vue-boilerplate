export default function(menu) {
  let routes = [];
  for (let i = 0; i < menu.length; i++) {
    let parent = menu[i];
    let obj = {
      path: parent.path,
      name: parent.name,
      title: parent.title,
      auth: parent.auth,
      redirect: parent.redirect
    };
    routes.push(obj);
    if (parent.children != undefined) {
      for (let j = 0; j < parent.children.length; j++) {
        let children = parent.children[j];
        let obj = {
          path: children.path,
          name: children.name,
          title: children.title,
          component: children.component,
          auth: children.auth
        };
        routes.push(obj);
      }
    }
  }
  return routes;
}
