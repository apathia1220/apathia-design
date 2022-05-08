import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
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
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag,
    } = props
    // 标记需要上传文件得input元素
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    //更新上传文件列表
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    // 如果两次上传得文件得id相同就用新得文件信息覆盖原有得文件信息
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }
    // 点击上传button时，触发点击事件，由于隐藏了上传文件的按钮，所以需要调用事件点击
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    // 处理文件上传状态发生变化时
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        /**
         * 首先获取选中的文件
         * 更新显示文件列表中的文件信息
         */
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    // 处理点击显示列表中的文件删除按钮
    const handleRemove = (file: UploadFile) => {
        /**
         * 如果有删除后的回调则执行回调
         */
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    // 处理上传文件
    const uploadFiles = (files: FileList) => {
        /**
         * 为了应对上传多文件的需求，将上传的文件转化为列表
         * 对上传文件列表进行遍历
         * 如果没有定义生命周期上传文件前的函数则直接上传文件
         * 如果定义了上传前的回调，则先执行上传前的回调
         * 执行完之后根据返回的结果是不是promise再进行文件的上传
         */
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    // 进行上传文件操作
    const post = (file: File) => {
        // 定义一个上传文件的完整信息
        // 同时将percent设置为0 上传的文件状态设置为ready
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList])
        // 更新显示列表，直接使用setFileList会导致没有办法获得前一个的信息
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        // 将数据拼接到formData上
        formData.append(name || 'file', file)
        // 发送请求时如果有需要添加的data
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        // 发送请求
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            // 上传文件时的回调
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            updateFileList(_file, { status: 'success', response: resp.data })
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            updateFileList(_file, { status: 'error', error: err })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }

    return (
        <div
            className="apathia-upload-component"
        >
            <div className="apathia-upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}>
                {drag ?
                    <Dragger onFile={(files) => { uploadFiles(files) }}>
                        {children}
                    </Dragger> :
                    children
                }
                <input
                    className="apathia-file-input"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>

            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}
export default Upload;