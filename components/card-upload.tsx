"use client";

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";
import { cn } from "@/utils/tailwind";
import {
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  RefreshCwIcon,
  TriangleAlert,
  Upload,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

// Extend FileWithPreview to include upload status and progress
export type FileUploadItem = FileWithPreview & {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
};

type CardUploadProps = {
  files: FileUploadItem[];
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  onFilesChange: (files: FileUploadItem[]) => void;
  onFileRemove?: (id: string) => void;
};

export default function CardUpload({
  files,
  maxFiles = 4,
  maxSize = 2 * 1024 * 1024, // 2MB
  accept = "*",
  multiple = true,
  className,
  disabled = false,
  children,
  onFilesChange,
  onFileRemove,
}: CardUploadProps) {
  const [
    { isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
    initialFiles: [],
    onFilesChange: (newFiles) => {
      // Convert to upload items when files change, preserving existing status
      const newUploadFiles = newFiles.map((file) => {
        const existingFile = files.find((existing) => existing.id === file.id);

        if (existingFile) {
          // Preserve existing file status and progress
          return {
            ...existingFile,
            ...file, // Update any changed properties from the file
          };
        } else {
          // New file - set to uploading
          return {
            ...file,
            progress: 0,
            status: "uploading" as const,
          };
        }
      });

      onFilesChange?.(newUploadFiles);
    },
  });

  const removeUploadFile = (fileId: string) => {
    const fileToRemove = files.find((f) => f.id === fileId);
    if (fileToRemove) {
      removeFile(fileToRemove.id);
    }

    onFileRemove?.(fileId);
  };

  const retryUpload = (fileId: string) => {};

  const getFileIcon = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type;
    if (type.startsWith("image/")) return <ImageIcon className="size-6" />;
    if (type.startsWith("video/")) return <VideoIcon className="size-6" />;
    if (type.startsWith("audio/")) return <HeadphonesIcon className="size-6" />;
    if (type.includes("pdf")) return <FileTextIcon className="size-6" />;
    if (type.includes("word") || type.includes("doc"))
      return <FileTextIcon className="size-6" />;
    if (type.includes("excel") || type.includes("sheet"))
      return <FileSpreadsheetIcon className="size-6" />;
    if (type.includes("zip") || type.includes("rar"))
      return <FileArchiveIcon className="size-6" />;
    return <FileTextIcon className="size-6" />;
  };

  return (
    <fieldset disabled={disabled}>
      <div className={cn("w-full space-y-4", className)}>
        {/* Upload Area */}
        <div
          className={cn(
            "relative rounded-lg border border-dashed p-6 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input {...getInputProps()} className="sr-only" />

          <div className="flex flex-col items-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors",
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/25"
              )}
              onClick={openFileDialog}
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
            </Button>

            {children ? (
              <div onClick={openFileDialog}>{children}</div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Drop files here or{" "}
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="cursor-pointer text-primary underline-offset-4 hover:underline"
                  >
                    browse files
                  </button>
                </p>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {formatBytes(maxSize)} • Maximum files:{" "}
                  {maxFiles}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Files Grid */}
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {files.map((fileItem) => (
                <div key={fileItem.id} className="relative group">
                  {/* Remove button */}
                  <Button
                    type="button"
                    onClick={() => removeUploadFile(fileItem.id)}
                    variant="outline"
                    size="icon"
                    className="absolute -end-2 -top-2 z-10 size-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <XIcon className="size-3" />
                  </Button>

                  {/* Wrapper */}
                  <div className="relative overflow-hidden rounded-lg border bg-card transition-colors">
                    {/* Image preview or file icon area */}
                    <div className="relative aspect-square bg-muted border-b border-border">
                      {fileItem.file.type.startsWith("image/") &&
                      fileItem.preview ? (
                        <>
                          {/* Image cover */}
                          <img
                            src={fileItem.preview}
                            alt={fileItem.file.name}
                            className="h-full w-full object-cover"
                          />
                          {/* Progress overlay for uploading images */}
                          {fileItem.status === "uploading" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <div className="relative">
                                <svg
                                  className="size-12 -rotate-90"
                                  viewBox="0 0 48 48"
                                >
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="text-muted/60"
                                  />
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray={`${2 * Math.PI * 20}`}
                                    strokeDashoffset={`${
                                      2 *
                                      Math.PI *
                                      20 *
                                      (1 - fileItem.progress / 100)
                                    }`}
                                    className="text-white transition-all duration-300"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        /* File icon area for non-images */
                        <div className="flex h-full items-center justify-center text-muted-foreground/80">
                          {fileItem.status === "uploading" ? (
                            <div className="relative">
                              <svg
                                className="size-12 -rotate-90"
                                viewBox="0 0 48 48"
                              >
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  className="text-muted-foreground/20"
                                />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeDasharray={`${2 * Math.PI * 20}`}
                                  strokeDashoffset={`${
                                    2 *
                                    Math.PI *
                                    20 *
                                    (1 - fileItem.progress / 100)
                                  }`}
                                  className="text-primary transition-all duration-300"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                {getFileIcon(fileItem.file)}
                              </div>
                            </div>
                          ) : (
                            <div className="text-4xl">
                              {getFileIcon(fileItem.file)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* File info footer */}
                    <div className="p-1 px-2">
                      <div className="space-y-1">
                        <p className="truncate text-xs font-medium">
                          {fileItem.file.name}
                        </p>
                        <div className="relative flex items-center justify-between gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatBytes(fileItem.file.size)}
                          </span>

                          {fileItem.status === "error" && fileItem.error && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  onClick={() => retryUpload(fileItem.id)}
                                  variant="ghost"
                                  size="icon"
                                  className="absolute end-0 -top-1.25 size-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <RefreshCwIcon className="size-3 opacity-100" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Upload failed. Retry
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Messages */}
        {errors.length > 0 && (
          <Alert variant="destructive" appearance="light" className="mt-5">
            <AlertIcon>
              <TriangleAlert />
            </AlertIcon>
            <AlertContent>
              <AlertDescription>
                {errors.map((error, index) => (
                  <p key={index} className="last:mb-0">
                    {error}
                  </p>
                ))}
              </AlertDescription>
            </AlertContent>
          </Alert>
        )}
      </div>
    </fieldset>
  );
}
