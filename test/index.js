const path = require('path');
// 修改node运行的文件路径
process.chdir(path.join(__dirname,'smoke/template'));
// 简单的单元测试
describe('builder-webpack test case',()=>{
    require('./unit/webpack-base-test')
})
// 检测测试覆盖率
