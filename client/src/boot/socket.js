
import Ws from "@adonisjs/websocket-client";
const ws = Ws("ws://localhost:3333")
export default async ({ Vue }) => {
  Vue.prototype.$socket = ws;
}
export { Ws }