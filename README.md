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

### 2. 文件大小限制

```javascript
const instance = new AUpload()
instance.middleware.onAppendFile((task)=>{
	const file = task.file;
	const extensions =['.mp3,.mp4'];
	const ext = file.name.substring(file.name.lastIndexOf('.'))
	if( !extensions.include(ext) ){
		throw new ERROR(`不支持的文件类型，请选择:`, extensions.join(''))
	}
})
btn.addEventListener('click', ()=>{
	instance.select();
})
```

### 2. 系统内置界面

```javascript
const instance = new AUpload()
instance.attachView(AUpload.View)
```

### 3. 修改服务的编码方式
AUpload默认使用FormData进行包装
示例如下：
```
const task = {name:'a.txt',size:1024, file:File },
会编码为:
------WebKitFormBoundary3AMiXnWD8WjBsiAx
Content-Disposition: form-data; name="name"

a.txt
------WebKitFormBoundary3AMiXnWD8WjBsiAx
Content-Disposition: form-data; name="size"

1024
------WebKitFormBoundary3AMiXnWD8WjBsiAx
Content-Disposition: form-data; name="file"; filename="a.txt"
Content-Type: application/octet-stream


------WebKitFormBoundary3AMiXnWD8WjBsiAx--
```

如果要修改包装方式，您可以这么做
```
const instance = new AUpload();
AUpload.Service.encode='json'
```
您会得到如下结果：
```
 {name:'a.txt',size:1024, file:'xfsef1' }
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
