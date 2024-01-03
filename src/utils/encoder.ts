export class FileEncoder {
  /**
   * 将文件流转为 File对象
   * @param buffer 
   * @param name 
   * @param fileType 
   */
  async buffer2File(buffer: ArrayBuffer, name: string, fileType: string): Promise<File> {
    const blob = new Blob([buffer], { type: fileType });
    const file = new File([blob], name);
    return file;
  }

  async blob2File(blob: Blob, name) {
    return new File([blob], name);
  }

  async file2Buffer(file: File, length:number=-1) {
    const len = length<0 ? file.size : Math.min( length, file.size )
    const chunkSize = 8192; // 8 KB
    const filePrototype:any = File.prototype
    const blobSlice = filePrototype.slice || filePrototype.mozSlice || filePrototype.webkitSlice
    return new Promise((resolve) => {
      let offset = 0;
      let result = new Uint8Array( len );
      const reader = new FileReader();
      reader.onload = function (evt: any) {
        const buffer = new Uint8Array(evt.target.result as ArrayBuffer);
        result.set(buffer, offset);
        offset += buffer.length;
        if (offset < file.size) {
          if( offset >= length ){
            resolve( result )
          }else{
            readSlice();
          }
        }else{
          resolve( result)
        }
      };
      function readSlice() {
        const end = Math.min( len, offset+ chunkSize, file.size );
        const slice = blobSlice.call(file, offset, end );
        reader.readAsArrayBuffer(slice);
      }
      readSlice()
    })
  }

  /**
   * 生成文件的hash串(基于WebCrypto的 SHA-256算法)
   * 注意：文件过大时计算会慢，可以通过开源的SparkMd5等更高效的方案或者配置length参数进行前部分字节计算
   * @param {File} file 文件对象
   * @param {number} [length] - 计算的文件字节长度，默认为整个文件字节大小
   * @returns 
   */
  async fileSha256(file: File, length:number=-1) {
    const arraybuffer = await this.file2Buffer(file, length);
    const cryptoSubtle = window.crypto.subtle;
    // 计算文件的 SHA-256 哈希值
    const hashBuffer = await cryptoSubtle.digest('SHA-256', arraybuffer as ArrayBuffer);
    // 将哈希值转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

//see:
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export const sha256 = async (str:string):Promise<string>=>{
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hash)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
