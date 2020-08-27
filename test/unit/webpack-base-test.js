/**
 * 构建webpac-base单元测试
 */
// 断言工具
const assert = require('assert')
describe('webpack.base.js test case',()=>{
    const baseConfig = require('../../lib/webpack.prod');
    console.log(baseConfig);
    it('entry',()=>{
        assert.equal(baseConfig.entry.index,'D:/大前端学习资源/webpack/builder-webpack/test/smoke/template/src/index/index.js')
        assert.equal(baseConfig.entry.search,'D:/大前端学习资源/webpack/builder-webpack/test/smoke/template/src/search/index.js')
    })
})