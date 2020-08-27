/**
 * 检测css js文件是否存在
 */
const glob = require('glob-all');
describe('checking generated  css js files',()=>{
    // 编写测试用例
    it('should generate css js files',(done)=>{
        const files = glob.sync([
            './dist/index_*.js',
            './dist/index_*.css',
            './dist/search*.js',
            './dist/search*.css',
        ])
        console.log('files',files)
        if(files.length>1){
            done();
        }else{
            throw new Error('no css js files generated')
        }
    })
})