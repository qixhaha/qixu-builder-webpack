/**
 * 构建冒烟测试
 * 两步：
 * 第一步检测构建是否成功
 * 第二部检测构建是否生成静态文件
 * 冒烟测试主要检测大体上是否
 */
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');
const mocha = new Mocha({
    timeout:'10000ms'
})
// node进程运行的工作目录
process.chdir(path.join(__dirname,'template'))
rimraf('./dist',()=>{
    const prodConfig = require('../../lib/webpack.prod');
    // 相当于执行webpack打包 将当前node运行文件在template文件中执行
    webpack(prodConfig,(err,stats)=>{
        if(err){
            console.log('err',err);
            process.exit(2)
        }
        console.log('webpack build success,begin run test');
        mocha.addFile(path.join(__dirname,"html-test.js"))
        mocha.addFile(path.join(__dirname,"css-js-test.js"))
        mocha.run()
    
    })
})