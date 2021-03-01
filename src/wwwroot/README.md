# ts框架

### 使用方法
```
npm install
npm run watch
```

### 命令说明
```

npm run watch 开发使用 自动监听文件变化进行生成   （不再会生成版本号    上次是什么版本就是什么版本）

npm run devStart 生成开发版文件    （不再会生成版本号    上次是什么版本就是什么版本）

npm run gaStart 生成生产版文件      （会根据文件的hash生成版本号）

```
### 文件介绍 
```
├── assets   资源文件夹
│    │──  font 字体文件夹
│    │──  images    图片文件夹
│    └──  plugin    外部引用的插件文件夹    
├── work  开发文件夹
│    ├── common  工具文件夹   放一些当前项目需要的一些工具 默认放了三个文件夹 其他的根据项目自行添加
|    |    |──  config    配置文件夹
|    |    |    └──  env  环境配置文件      
|    |    |──  enum 枚举文件夹
|    |    └──  service   服务文件夹     所有的请求在里面完成
│    ├── components  插件文件
│    ├── page  页面文件  包含 ts less  等等  当前独有的全部放在里面
│    └── public 全局的js css的开发文件夹   
|    |    |──  script    全局的js文件夹 只会生成  index.ts文件
|    |    └──  style     全局样式文件夹 只会生成  index.less文件夹
|    |    |    └──  common    全局less方法的文件夹
├── dist  生产文件
│    ├── public   全局css js的文件
|    |    |──  script 全局js的生产文件
|    |    └──  style 全局css的生产文件
│    ├── scripts  js的生产文件夹
│    └── styles css的生产文件夹
└── node    配置文件
     ├── gulp  gulp的配置
     │    ├── build 需要生成的文件配置 在jspages里面配置需要生成的ts文件
     │    └── config gulp里面各个路径的配置文件
     └─── karma 单元测试的配置文件
     
```