/* eslint-disable */
const fs = require('fs');
const path = require('path');

function exists(path) {
  return fs.existsSync(path);  
}

function isFile(path) {  
  return exists(path) && fs.statSync(path).isFile();  
} 
function isDir(path){  
  return exists(path) && fs.statSync(path).isDirectory();  
}  
function createTheme(){
  const ComPath = './src/components';
  const libLessFiles = fs.readdirSync(ComPath);
  const LessArr = [];
  for(var i=0,j=libLessFiles.length;i<j;i+=1){
    const folder = libLessFiles[i];
    const LessPath = ComPath+"/"+folder+'/index.less';
    if(isFile(LessPath)){
      var data = fs.readFileSync(LessPath, 'utf8');
      if(folder!=='theme'){
        LessArr.push(data.replace("@import '~star-web/theme/index.less';",''));
      }else{
        DefaultTheme = data;
      }
    }
  }
  const allLessPath = path.join('./', '/theme/all.less');
  if(isFile(allLessPath)){
      fs.unlinkSync(allLessPath);
  }
  fs.writeFileSync(allLessPath,LessArr.join(' '));
  console.log(">>>>>>>>>>>>>总样式文件写入完成！>>>>>>>>>>>>>");
}
module.exports = createTheme;


