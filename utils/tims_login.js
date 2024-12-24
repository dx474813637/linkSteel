export function tim_online_login() {
    // let that = this
	let data = uni.getStorageSync('WebSocketInfo')
    uni.connectSocket({
        url: 'wss://toocle.ki17.com/'
    });
    let login = data.w_login
    let token = data.w_token
    uni.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
      var login_data = '{"type":"login","client_name":"'+login+'","room_id":"rawmex_xcx","token":"'+token+'","login":"'+login+'"}';
      uni.sendSocketMessage({
            data: login_data
      });
	  uni.sendSocketMessage({
	        data: '{"type":"xcx","client_name":"'+login+'","room_id":"rawmex_xcx","token":"'+token+'","login":"'+login+'","content":"'+getCurrentPages()[0].$page.fullPath+'"}'
	  });
    });
    uni.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！');
    });
    uni.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！');
      // tim_online_login();
    });
}