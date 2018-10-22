// 判断是否服务器环境(测试/生产? 如何判断?)
const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  // baseURI: isProdMode ? 'api.lms.local/api/' : 'api/'
  // baseURI: isProdMode ? 'http://127.0.0.1:8080/inner' : 'api/'
  // baseURI: isProdMode ? 'http://192.168.1.108:8080/inner/' : 'api/'
  // baseURI: isProdMode ? 'http://192.168.2.131:8080/lms-java/inner' : 'api/'
  baseURI: isProdMode ? '/' : 'api/'
}
