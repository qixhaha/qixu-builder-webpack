/**
 * 检测html文件是否存在
 */
const glob = require('glob-all');
describe('checking generated html files',()=>{
    // 编写测试用例
    it('should generate html files',(done)=>{
        // node环境执行的目录为template下面
        const files = glob.sync([
            './dist/index.html',
            './dist/search.html'
        ])
        if(files.length>1){
            done();
        }else{
            throw new Error('no html files generated')
        }
    })
})