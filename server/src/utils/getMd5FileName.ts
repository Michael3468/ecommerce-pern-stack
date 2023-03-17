import { UploadedFile } from 'express-fileupload';

const getMd5FileName = (img: UploadedFile): string => {
  const fileExtension = img.name.split('.').pop();
  return `${img.md5}.${fileExtension}`;
};

export default getMd5FileName;
