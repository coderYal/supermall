import axios from 'axios'

export function request(config) {
//  1: 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h8',//  配置默认请求跟路径
    timeout: 8000// 设置超时时间为5秒
  })

//  2: axios的拦截器
//    2.1: 请求拦截的作用
  instance.interceptors.request.use(config => {
  //  1: 发送网络请求, 可以在页面添加一个loading组件, 作为动画
  //  2: 某些请求必须用户登录, 判断用户是否有token, 如果没有就跳转到登录页
  //  3: 对请求的参数进行标准化
    return config;// 拦截处理之后必须把结果返回, 不然就接收不到值
  }, err => {
    console.log(err);
  })
//    2.2:  响应拦截
  instance.interceptors.response.use(res => {
  //  1: 主要是对数据进行过滤
    return res.data;// 响应拦截之后也要返回数据
  }, err => {
    //  响应失败, 可以根据错误码, 跳转到不同的错误提示页面
    console.log(err);
  })

  //  发送网络请求
  //  实例返回的就是一个promise对象, 可以调用then
  return instance(config);
}
