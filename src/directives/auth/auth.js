import auth from "@/constants/auth";

export default {
  bind(el, binding) {
    const { value } = binding;
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
    console.log(authName, "authName");
    let authState = value.indexOf(authName);
    console.log(authState, "authState");
    if (authState == -1) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
    console.log(value);
  }
};
