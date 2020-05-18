/*
 * @Author: 付国强
 * @Date: 2020-02-25 15:19:20
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 17:11:21
 * @Description:
 */
import request from "@/utils/services/index";
export function testApi() {
  return request({
    url: "/mock/components/chart",
    method: "get"
  });
}
