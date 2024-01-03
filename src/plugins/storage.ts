import { debounce } from "@/utils";
import { IAUploadPlugin, IUpload, UploadTask } from "../../typings";
import { AbstractPlugins } from './index'
import { AUploadEvent } from "@/core/event";
import { localStore } from "@/utils/storage";

const localforage: any = window['localforage']

export class PluginsStorage extends AbstractPlugins {
  static pluginName = 'storage'
  static storeKey = 'aupload'
  private _evtUploadHandler
  private _cache: Array<{ hash: string, data: Record<string, any> }> = []

  private _cachedFileSize: number = 0
  constructor() {
    super()
  }

  setup(context: IUpload) {
    super.setup(context)
    this.initialize();
  }

  private initialize() {
    this._evtUploadHandler = this.onUploadEvent.bind(this);
    if (!localforage) {
      console.warn(`当前环境未引入localforage包，离线上传功能将不可以用，如有需要请参考：https://localforage.docschina.org/ 引入umd 模块`);
    }
    [
      AUploadEvent.READY,
      AUploadEvent.APPEND,
      AUploadEvent.REMOVE,
      AUploadEvent.PROGRESS
    ].forEach(type => {
      this.uploader.addEventListener(type, this._evtUploadHandler)
    })
  }

  private async onUploadEvent(evt: AUploadEvent) {
    const { task, chunk } = evt.data || {}
    switch (evt.type) {
      case AUploadEvent.READY:
        this._cache = localStore.get(PluginsStorage.storeKey) || [];
        const hashs = await localforage.keys()
        for (let key of hashs) {
          let blob = await localforage.getItem(key)
          if (blob && blob instanceof Blob) {
            const current = this._cache.find(item => {
              return item.data.hash == key
            })
            if (current) {
              this._cachedFileSize += blob.size;
              current.data.file = new File([blob], current.data.name)
            } else {
              await localforage.removeItem(key);
            }
          }
        }
        this._cache.forEach(item => {
          this.uploader.append(item.data as UploadTask, false)
        })
        break;
      case AUploadEvent.APPEND:
        this.store(task as UploadTask);
        break;
      case AUploadEvent.REMOVE:
        if (task && task.hash) {
          this._cachedFileSize -= task.size ?? 0
          const findIndex = this._cache.findIndex(item => {
            return item.data.hash == task.hash
          })
          if (findIndex >= -1) {
            this._cache.splice(findIndex, 1);
            localStore.set(PluginsStorage.storeKey, this._cache)
            if (localforage) {
              try {
                localforage.removeItem(task.hash)
              } catch (err) { }
            }
          }
        }
        break;
      case AUploadEvent.PROGRESS:
        debounce(()=>{
          this.store( task as UploadTask, false )
        }, 5*1000, this )();
        break;

    }
  }

  private async store(task: UploadTask, storeFile: boolean = true) {
    const file = task.file as File;
    const hash = task.hash ??''
    const cachedFileSize = this.uploader.option.cachedFileSize;
    if (file && file instanceof File && hash) {
      if (cachedFileSize && cachedFileSize <= (this._cachedFileSize+ file.size)) {
        const error = `存储超标，请增大 option.cachedFileSize`
        console.warn(error)
        //this.uploader.dispatch( new AUploadEvent(AUploadEvent.ERROR, { task, error }))
        return;
      }
      let blob
      if( storeFile ){
        blob = file.slice(0, file.size);
      }
      // 清空localStorage的file，将其存至localForage
      
      const hashs = this._cache.map(item => item.data.hash)
      if (!hashs.includes(hash)) {
        let simple = {...task }
        simple.file = '';
        this._cache.push({ hash, data: simple });
        this._cachedFileSize  =+ file.size
      }
      localStore.set(PluginsStorage.storeKey, this._cache)
      if (storeFile && blob ) {
        const localforage: any = window['localforage']
        if (localforage) {
          await localforage.setItem(hash, blob)
        }
      }
    }
  }
}
