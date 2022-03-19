import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    /**
     * 上传文件的信息
     * uid：文件的id
     * size：文件的大小
     * status：上传文件的状态
     * percent：上传文件进度的百分比
     * raw：原始文件类型
     * response：上传文件成功时的返回数据
     * error：上传文件出错时的返回错误信息
     */
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /**
     * 上传文件组件的props
     * action：上传文件的方式
     * defaultFileList：上传文件的列表，用于显示上传文件的信息
     * beforeUpload、onProgress、onSuccess、onError、onChange、onRemove：上传组件的整个生命周期
     * headers：请求的head信息
     * name：文件是否需要自定义文件名
     * data：求情时需要携带的data
     * withCredentials：发送请求时是否携带cokie
     * accept：发送求情时携带的
     * mutiple：上传时添加多个文件
     * drag：上传文件是否采用拖得形式
     */
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
