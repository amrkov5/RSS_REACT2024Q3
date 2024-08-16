function encodeImageFileAsURL(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

const handleUpload = async (FileList: FileList) => {
  const data = (await encodeImageFileAsURL(FileList[0])) as string;
  return data;
};

export default handleUpload;
