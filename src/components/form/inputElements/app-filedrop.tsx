import React, {
    FunctionComponent,
    memo,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Clear, Description, UploadFile } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import clsx from "clsx";
import { Accept, FileError, FileRejection, useDropzone } from "react-dropzone";

import AppButton from "./app-button";

type FileValue<Multiple extends boolean | undefined> = Multiple extends true
    ? Array<File>
    : File;

interface AppFiledropProps<Multiple extends boolean | undefined> {
    onChange?: (files: FileValue<Multiple>) => void;
    disabled?: boolean;
    multiple?: Multiple;
    append?: Multiple;
    accept?: Accept;
    id?: string;
    preview?: boolean;
    maxFiles?: number;
    clearable?: boolean;
    minSize?: number;
    maxSize?: number;
    errorMessage?: string;
    helperText?: string;
    title?: ReactNode;
    description?: ReactNode;
    value?: FileValue<Multiple>;
}
interface FileWithPreview extends File {
    preview?: string;
}
const LocalFiledrop = <Multiple extends boolean | undefined>(
    props: PropsWithChildren<AppFiledropProps<Multiple>>
) => {
    const {
        onChange,
        disabled,
        id = "dropzone-file",
        multiple,
        children,
        preview = true,
        maxFiles = multiple ? 10 : 1,
        clearable,
        errorMessage,
        helperText,
        title,
        description,
        append,
        value,
        ...rest
    } = props;
    const [files, setFiles] = useState<FileWithPreview[] | undefined>();
    const [errors, setErrors] = useState<
        [name: string, error: FileError[]][] | undefined
    >();
    const imageRegex = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (acceptedFiles && acceptedFiles.length) {
                if (multiple && append) {
                    setFiles((fileDatas) => {
                        if (!fileDatas && !acceptedFiles) return undefined;

                        return [
                            ...(fileDatas || []),
                            ...acceptedFiles.map((file) => {
                                const isImage = file.name.match(imageRegex);
                                if (isImage) {
                                    return Object.assign(file, {
                                        preview: URL.createObjectURL(file),
                                    });
                                }
                                return file;
                            }),
                        ];
                    });
                } else {
                    setFiles(
                        acceptedFiles.map((file) => {
                            const isImage = file.name.match(imageRegex);
                            if (isImage) {
                                return Object.assign(file, {
                                    preview: URL.createObjectURL(file),
                                });
                            }
                            return file;
                        })
                    );
                }
            }
            if (rejectedFiles && rejectedFiles.length) {
                setErrors(
                    rejectedFiles.map((rejected) => [
                        rejected.file.name,
                        rejected.errors,
                    ])
                );
            }
        },
        [multiple, append]
    );
    useEffect(() => {
        if (files && onChange) {
            onChange((multiple ? files : files[0]) as FileValue<Multiple>);
        }
        if (files) {
            setErrors([]);
        }
    }, [files]);
    useEffect(() => {
        if (
            multiple
                ? JSON.stringify(
                      (files as FileWithPreview[])?.map((r) => r.name)
                  ) !== JSON.stringify((value as File[])?.map((r) => r.name))
                : JSON.stringify(
                      (files as FileWithPreview | undefined)?.name
                  ) !== JSON.stringify((value as File)?.name)
        ) {
            setFiles(value as FileWithPreview[] | undefined);
        }
    }, [value]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled,
        multiple,
        maxFiles,
        ...rest,
    });

    const onDeleteClick = (i: number) => () => {
        setFiles((state) =>
            state ? [...state.slice(0, i), ...state.slice(i + 1)] : undefined
        );
    };
    const onClear = () => {
        setFiles([]);
    };
    return (
        <div className="flex w-full min-w-[200px] flex-col p:min-w-[300px]">
            <div className="flex w-full items-center justify-center">
                <div
                    {...getRootProps({
                        className: clsx(
                            "flex flex-col items-center justify-center w-full h-60 border-2 border-primary-300 border-dashed rounded-lg cursor-pointer bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:border-primary-600 dark:hover:border-primary-500 dark:hover:bg-primary-900",
                            {
                                "cursor-no-drop !bg-gray-200 !hover:bg-gray-200 dark:!bg-gray-900 dark:!hover:bg-gray-900 dark:!border-gray-600 dark:!hover:border-gray-600":
                                    disabled,
                                "border-red-300 !bg-red-200 hover:!bg-red-100 dark:!bg-red-950 dark:hover:!bg-red-900 dark:!border-red-600 dark:hover:!border-red-600":
                                    (!!errorMessage || !!errors?.length) &&
                                    !disabled,
                                "border-red-300 dark:!border-red-600":
                                    (!!errorMessage || !!errors?.length) &&
                                    disabled,
                            }
                        ),
                    })}>
                    <div className="flex flex-col items-center justify-center px-3 pb-6 pt-5">
                        {React.Children.count(children) ? (
                            children
                        ) : (
                            <>
                                <UploadFile
                                    fontSize="large"
                                    className={clsx(
                                        "text-primary-700 dark:text-primary-100",
                                        {
                                            "text-red-700 dark:text-red-100":
                                                !!errorMessage ||
                                                !!errors?.length,
                                        }
                                    )}
                                />
                                <p
                                    className={clsx(
                                        "mb-2 text-sm text-primary-500 dark:text-primary-300",
                                        {
                                            "text-red-500 dark:text-red-300":
                                                !!errorMessage ||
                                                !!errors?.length,
                                        }
                                    )}>
                                    {title ?? (
                                        <>
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </>
                                    )}
                                </p>
                                <p
                                    className={clsx(
                                        "text-xs text-primary-500 dark:text-primary-300",
                                        {
                                            "text-red-500 dark:text-red-300":
                                                !!errorMessage ||
                                                !!errors?.length,
                                        }
                                    )}>
                                    {description ?? (
                                        <>
                                            SVG, PNG, JPG or GIF (MAX.
                                            800x400px)
                                        </>
                                    )}
                                </p>
                            </>
                        )}
                    </div>
                    <input
                        id={id}
                        type="file"
                        className="hidden"
                        {...getInputProps()}
                    />
                </div>
            </div>
            {preview && !!files?.length && (
                <div className="flex flex-col gap-2">
                    <h4
                        className={clsx(
                            "mb-0 mt-3 flex items-center justify-between text-primary-500 dark:text-primary-300",
                            {
                                "text-red-500 dark:text-red-300":
                                    !!errorMessage || !!errors?.length,
                            }
                        )}>
                        Files
                        <AppButton
                            size="small"
                            variant="text"
                            onClick={onClear}>
                            Clear All
                        </AppButton>
                    </h4>
                    {files.map((file, i) => (
                        <div
                            className="flex flex-row items-center justify-start gap-2"
                            key={i}>
                            {file.preview ? (
                                <div className="h-10 w-10 rounded-md">
                                    <img
                                        src={file.preview}
                                        alt="Preview"
                                        className="h-full w-full rounded-md object-cover shadow-md"
                                    />
                                </div>
                            ) : (
                                <Description />
                            )}
                            <span
                                className={clsx(
                                    "text-primary-500 dark:text-primary-300",
                                    {
                                        "text-red-500 dark:text-red-300":
                                            !!errorMessage || !!errors?.length,
                                    }
                                )}>
                                {file.name}
                            </span>
                            {clearable && (
                                <AppButton
                                    variant="icon"
                                    size="small"
                                    onClick={onDeleteClick(i)}>
                                    <Clear fontSize="small" />
                                </AppButton>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {!!errors?.length && (
                <div className="flex flex-col gap-2">
                    <h4 className="mb-0 mt-3 text-sm text-red-500 dark:text-red-300">
                        Errors
                    </h4>
                    <ul className="m-0 flex flex-col justify-start gap-1">
                        {errors.map(([name, error], i) => (
                            <li
                                className="text-xs text-red-500 dark:text-red-300"
                                key={i}>
                                <span className="font-bold">{name} :</span>{" "}
                                {error?.[0]?.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {!!(errorMessage || helperText) && (
                <FormHelperText error={!!errorMessage}>
                    {errorMessage || helperText}
                </FormHelperText>
            )}
        </div>
    );
};

const AppFiledrop = memo(LocalFiledrop);
AppFiledrop.displayName = "AppFiledrop";

export default AppFiledrop;
