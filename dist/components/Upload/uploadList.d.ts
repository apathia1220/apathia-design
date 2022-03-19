import { FC } from 'react';
import { UploadFile } from './upload';
interface UploadListProps {
    /**
     * fielList:显示上传文件的文件列表
     * onRemove：点击删除的回调
     */
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: FC<UploadListProps>;
export default UploadList;
