export const getImageMime = () => {
  return ['gif', 'jpeg', 'jpg', 'pjpeg', 'x-png', 'png', 'webp'].map(item => 'image/' + item)
}

export const getFileType = (file: File): Promise<string> => {
  let type = '';
  // 获取文件头信息
  const reader = new FileReader();
  reader.readAsArrayBuffer(file.slice(0, 4));
  return new Promise(resolve => {
    reader.onloadend = () => {
      const buffer = reader.result as ArrayBuffer
      const header = new Uint8Array(buffer);
      let type = 'unknow'
      // 判断常见图片格式
      if (header[0] === 0xff && header[1] === 0xd8) {
        type = 'image/jpeg';
      } else if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47) {
        type = 'image/png';
      } else if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38) {
        type = 'image/gif';
      } else if (header[0] === 0x42 && header[1] === 0x4d) {
        type = 'image/bmp';

        // 判断常见文档格式
      } else if (header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46) {
        type = 'application/pdf';
      } else if (header[0] === 0x50 && header[1] === 0x4b && header[2] === 0x03 && header[3] === 0x04) {
        type = 'application/zip';
      } else if (header[0] === 0x7b && header[1] === 0x5c && header[2] === 0x72 && header[3] === 0x74) {
        type = 'text/rtf';
      } else if (header[0] === 0x50 && header[1] === 0x4b && header[2] === 0x53 && header[3] === 0x20) {
        type = 'application/vnd.ms-powerpoint';
        // 判断常见视频格式
      } else if (header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46) {
        const format = new DataView(buffer.slice(8, 12)).getUint32(0, false);
        if (format === 0x5741) {
          type = 'video/x-ms-wmv';
        } else if (format === 0x4156) {
          type = 'video/x-msvideo';
        } else if (format === 0x4852) {
          type = 'video/mp4';
        }
        // 其他类型
      } else if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38) {
        type = 'image/gif';
      } else if (header[0] === 0x46 && header[1] === 0x4c && header[2] === 0x56 && header[3] === 0x01) {
        type = 'video/x-flv';
      }
      resolve(type);
    };
  });
}

/**
 * 支持以下类型的mimeType列表 列举， 如 images/*, video/*, audio/*
 * @param str 
 */
export const getMime = (str: string) => {
  const map = {
    'image': /^image\/\*/,
    'video': /^video\/\*/,
    'audio': /^video\/\*/
  }
  const keys = Object.keys(map);
  const type = keys.find(item => {
    if (str.match(map[item])) {
      return true;
    }
  })
  let mimes: string[] = []
  switch (type) {
    case 'image':
      mimes = getImageMime()
      break;
  }
  return mimes;
}
