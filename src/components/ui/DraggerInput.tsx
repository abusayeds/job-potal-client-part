import { errorAlert, TResError } from "@/lib/alerts";
import { useUploadFileMutation } from "@/redux/features/common/common.api";
import { cn } from "@/utils/cn";
import { Modal, Upload, UploadFile, UploadProps } from "antd";
import React, { ReactNode, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
export type TFilePath = string[];

const { Dragger } = Upload;
const DraggerInput = ({
  children,
  multiple = false,
  defaultCalss,
  title,
  subTitle,
  showUploadList = false,
  setFilePaths,
  accept,
}: {
  children?: React.ReactNode;
  multiple?: boolean;
  defaultCalss?: string;
  title?: string | ReactNode;
  subTitle?: string;
  showUploadList?: boolean;
  setFilePaths?: React.Dispatch<React.SetStateAction<TFilePath>>;
  accept?: string;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  // const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [mutation, { isLoading }] = useUploadFileMutation();

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      if (!!setFilePaths) {
        setFilePaths((c) => [...c.filter((item) => !item.includes(file.name))]);
      }
    },
    accept: accept || "image/png,image/jpeg,image/svg+xml",
    beforeUpload: async (file) => {
      const isDuplicate = fileList.some(
        (prefile) => prefile.name === file.name
      );
      if (isDuplicate) {
        errorAlert({ error: { message: "This file is already exists!" } });
        return Upload.LIST_IGNORE;
      }
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await mutation(formData).unwrap();
        if (setFilePaths) {
          setFilePaths((c) =>
            multiple ? [...c, response.data.path] : [response.data.path]
          );
        }
        setFileList((c) => (multiple ? [...c, file] : [file]));
      } catch (error) {
        errorAlert({ error: error as TResError });
      }
      return false;
    },
    multiple: multiple,
    listType: "text",
    showUploadList: showUploadList &&
      fileList.length > 0 && {
        showPreviewIcon: true, // Enable preview icon
        showRemoveIcon: true, // Enable remove icon
        showDownloadIcon: false, // Disable download icon
      },
    onPreview: handlePreview,
    fileList: fileList,
    disabled: isLoading,

    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
    // onDrop(e) {
    //   console.log('Dropped files', e.dataTransfer.files);
    // },
  };
  return (
    <>
      <div className={cn("h-full", { "animate-pulse": isLoading })}>
        <Dragger {...props}>
          {children ? (
            children
          ) : (
            <div
              className={cn(
                "w-full flex flex-col justify-center items-center text-brand/30 hover:text-blue-400 transition-all",
                defaultCalss
              )}
            >
              <p className="flex justify-center pb-0.5">
                <BsCloudUpload size={30} />
              </p>
              {title}
              <p className="ant-upload-text">
                {subTitle || "Click or drag file"}
              </p>
            </div>
          )}
        </Dragger>
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default DraggerInput;
