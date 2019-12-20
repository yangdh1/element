# frontPlatform 自动化测试平台

项目编译前需要安装的依赖：
nodejs（项目编译运行用到）
ruby（sass生成css用到）
python（node-gyp用到）

# 安装依赖(如果依赖安装失败，开蓝灯等翻墙软件)
npm install

# 开发环境运行
npm run dev

# 编译生产环境运行包
npm run build

# 编译生产环境运行包并输出报告
npm run build --report


#修改基础请求URL
修改config 文件夹中的dev.env.js的BASE_API关键字。

#前端路由和后台接口的映射：
修改src/api/api.js

#修改菜单的链接地址
修改src/router/index.js


#其他注意事项
1. dist目录和node_moudle目录都是编译生成的，不要提交到版本管理
2. 页面都放在src/views下，公文页面放到documents下，督办页面放到supervision下
