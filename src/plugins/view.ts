import { IAUploadPlugin, IUpload, UploadTask } from 'aupload'
import { AbstractPlugins } from './index'
import { AUpload } from '../index'
import { Query } from '@/utils/query'
import FileItem from './component/FileItem'
import { AUploadEvent } from '@/core/event'
import { getMime } from '@/utils/mime'

const $ = new Query()
export class PluginsView extends AbstractPlugins {
  static pluginName = 'view'
  private _root: HTMLElement = document.createElement('div')
  private _holder: HTMLElement = document.createElement('div')
  private _masker: HTMLElement = document.createElement('div')
  private _info: HTMLElement = document.createElement('div')
  private _browser: HTMLElement = document.createElement('div')
  private _fileinput: HTMLElement = document.createElement('input')

  private _view = document.createElement('div')
  private _dropper = document.createElement('div')
  private _wrapperFiles = document.createElement('div')
  private _evtHandler
  private _evtUploadHandler
  private _evtRootHandler

  private _views: Array<FileItem> = []
  constructor() {
    super()
  }
  setup(context: IUpload) {
    super.setup(context)
    this.initialize()
  }
  private initialize() {
    // TODO
    // typescript@4.1.5
    // Typescript 在接口IUpload 定义了container属性，但是编译是报错，提示找不到属性
    const instance: any = this.uploader
    if (instance.container) {
      ;(instance.container as any).appendChild(this._root)
    }
    this._evtHandler = this.onEvent.bind(this)
    this._evtRootHandler = this.onRootEvent.bind(this)
    this._root.className = 'aupload_view'

    // this._masker = $.create('div',{

    // })

    this._root.appendChild(this._view)
    this._view.appendChild(this._dropper)
    this._view.appendChild(this._info)
    this._root.appendChild(this._wrapperFiles)

    this._dropper.className = 'dropper'
    this._wrapperFiles.className = 'task'

    this._masker.className = 'masker'
    this._view.className = 'view'
    this._view.title = '拖动或粘帖文件至此区域'
    this._holder.className = 'holder'
    this._info.className = 'info'
    this._browser = document.createElement('div')
    this._browser.className = 'button-primary button-large'
    this._info.appendChild(this._browser)

    this._dropper.appendChild(this._holder)
    this._dropper.appendChild(this._masker)

    this._info.appendChild(this._browser)

    const p = document.createElement('p')
    p.innerHTML = '请选择最大不可以超过100MB的文件'
    this._info.appendChild(p)

    const span = document.createElement('span')
    span.innerHTML = '请选择文件'
    this._browser.appendChild(span)
    this.reloadFileField()

    this._dropper.setAttribute('contenteditable', 'true')
    this.attachEvent()
  }

  private reloadFileField() {
    const option = this.uploader.option
    const file = this._browser.querySelector('input[type=file]')
    if (file) {
      file.removeEventListener('change', this._evtHandler)
      file.parentNode?.removeChild(file)
    }
    this._fileinput = document.createElement('input')
    if (option.multiple) {
      this._fileinput.setAttribute('multiple', 'multiple')
    }
    if (option.allowedMimeType) {
      const formattedMimies = option.allowedMimeType.reduce(
        (prev: Array<string>, current: string) => {
          const arr = getMime(current)
          prev = prev.concat(arr)
          return prev
        },
        []
      )
      this._fileinput.setAttribute('accept', formattedMimies.join(','))
    }
    this._browser.appendChild(this._fileinput)
    this._fileinput.setAttribute('type', 'file')
    this._fileinput.addEventListener('change', this._evtHandler)
  }
  private attachEvent() {
    const events = ['mouseleave', 'paste', 'drop', 'dragover', 'dragleave']
    for (let evt of events) {
      this._view.addEventListener(evt, this._evtHandler)
    }

    for (let evt of ['mouseenter', 'mouseleave', 'click']) {
      this._root.addEventListener(evt, this._evtRootHandler)
    }

    this._evtUploadHandler = this.onUploadEvent.bind(this)
    ;[
      AUploadEvent.READY,
      AUploadEvent.APPEND,
      AUploadEvent.REMOVE,
      AUploadEvent.PROGRESS,
      AUploadEvent.COMPLETE,
      AUploadEvent.ERROR,
      AUploadEvent.CHUNK_ERROR,
    ].forEach(type => {
      this.uploader.addEventListener(type, this._evtUploadHandler)
    })
  }

  private onRootEvent(evt: Event) {
    switch (evt.type) {
      case 'mouseenter':
      case 'click':
        this._holder.focus()
        break
      case 'mouseleave':
        this._holder.blur()
        break
    }
  }

  private appendFile(file: UploadTask) {
    const view = new FileItem(file)
    view.addEventListener('pause', (e, task) => {
      this.uploader.pause(task)
    })
    view.addEventListener('resume', (e, task) => {
      this.uploader.resume(task)
    })
    view.addEventListener('remove', (e, task) => {
      this.uploader.remove(task)
    })
    this._wrapperFiles.appendChild(view.root)
    this._views.push(view)
  }
  private removeFile(file: UploadTask) {
    const view = this._views.find((item, index) => {
      return item.task && item.task.hash == file.hash
    })
    if (view) {
      const idx = this._views.indexOf(view)
      this._views.splice(idx, 1)
      view.destroy()
    }
  }

  public uploadFile(files: Array<File>) {
    if (this.uploader) {
      this.uploader.upload(
        files.map(item => {
          return {
            name: item.name,
            size: item.size,
            file: item,
          }
        })
      )
    }
  }
  private highlightView(bool: boolean) {
    if (bool) {
      this._view.className = 'view view-in'
    } else {
      this._view.className = 'view'
    }
  }

  private onUploadEvent(evt: AUploadEvent) {
    const { task, chunk, message, error } = evt.data || {}
    switch (evt.type) {
      case AUploadEvent.APPEND:
        this.appendFile(task as UploadTask)
        break
      case AUploadEvent.REMOVE:
        this.removeFile(task as UploadTask)
        break
      case AUploadEvent.COMPLETE:
      case AUploadEvent.PROGRESS:
        if (task) {
          const progress = task.progress
          const view = this._views.find(item => {
            return item.task.hash == task.hash
          })
          if (view) {
            view.clearError()
            view.task = task
          }
        }
        break
      case AUploadEvent.CHUNK_ERROR:
        if (task) {
          const view = this._views.find(item => {
            return item.task.hash == task.hash
          })
          if (view) {
            view.onError(task)
          }
        }

        break
      case AUploadEvent.ERROR_APPEND:
        AUpload.Message.error(message + '', { autoClose: true })
        break
      case AUploadEvent.ERROR:
        if (error) {
          AUpload.Message.error(error + '')
        }
        break
    }
  }
  private onEvent(evt: Event) {
    console.log('onEvent:', evt.type)
    const event = evt as any
    let files: Array<File> = []
    switch (evt.type) {
      case 'change':
        files = Array.from((evt.target as any)?.files) as Array<File>
        this.uploadFile(files)
        this.reloadFileField()
        break
      case 'dragover':
        event.preventDefault() // 阻止浏览器默认行为，如打开文件
        event.stopPropagation()
        this.highlightView(true)
        break
      case 'mouseleave':
      case 'dragleave':
        this.highlightView(false)
        break
      case 'drop':
        event.preventDefault() // 阻止浏览器默认行为，如打开文件
        files = Array.from(event.dataTransfer.files) as Array<File>
        this.uploadFile(files)
        break
      case 'paste':
        const items = (event.clipboardData || event.originalEvent.clipboardData)
          .items
        files = []
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item.kind === 'file') {
            const file = item.getAsFile()
            files.push(file)
          }
        }
        if (files.length) {
          this.uploadFile(files)
        } else {
          AUpload.Message.warn(`粘帖上传时未找到可用文件，请重试`, {
            autoClose: true,
          })
        }
        break
    }
  }
}
