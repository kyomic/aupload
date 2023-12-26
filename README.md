# 摘要 

document by: https://markdown.ipip5.com/

# 使用说明

## 安装

## 运行

## 示例

### 1. 自定义界面上传

```javascript
const instance = new AUpload()
btn.addEventListener('click', ()=>{
	instance.select();
})
```

### 2. 系统内置界面

```javascript
const instance = new AUpload()
instance.attachView(AUpload.View)
```

### 3. 自定义文件处理器
```javascript
const instance = new AUpload();
# 添加阿里云OSS上传模块，前提需要引入plugins
instance.attachService(  new AUpload.AliOSS() )
```
## 文档
### 1. 接口
### 2. 事件
