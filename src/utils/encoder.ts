export class FileEncoder {
  /**
   * 将文件流转为 File对象
   * @param buffer 
   * @param name 
   * @param fileType 
   */
  async buffer2File(buffer: ArrayBuffer, name: string, fileType: string):Promise<File> {
    const blob = new Blob([buffer], { type: fileType });
    const file = new File([blob], name);
    return file;
  }
}
