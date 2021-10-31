import React, { ChangeEventHandler, useEffect, useState } from "react";

export interface IFileInput {
  type: "file" | "image";
  align?: "center" | "left";
  initialFile?: any;
  initialImage?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FileInput: React.FC<IFileInput> = ({
  type,
  align = "center",
  onChange,
  initialFile,
  initialImage,
  ...props
}) => {
  const [filePrevUrl, setFilePrevUrl] = useState(
    initialFile ? URL.createObjectURL(initialFile) : initialImage ?? null
  );

  // to remove the preview after redirect back to the page with success
  useEffect(() => {
    setFilePrevUrl(
      initialFile ? URL.createObjectURL(initialFile) : initialImage ?? null
    );
  }, [initialFile && initialFile.name]);

  return (
    <div className="flex flex-col justify-center items-center border border-dashed lg:p-5 max-w-full">
      <label className="w-max md:w-44 my-6 flex flex-col items-center px-3 py-4 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
        {type == "file" && (
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
        )}

        {type == "image" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-8 h-8"
            viewBox="0 0 20 20"
          >
            <path d="M4,5h13v7h2V5c0-1.103-0.897-2-2-2H4C2.897,3,2,3.897,2,5v12c0,1.103,0.897,2,2,2h8v-2H4V5z"></path>
            <path d="M8 11L5 15 16 15 12 9 9 13z"></path>
            <path d="M19 14L17 14 17 17 14 17 14 19 17 19 17 22 19 22 19 19 22 19 22 17 19 17z"></path>
          </svg>
        )}
        <span className="mt-2 text-xs md:text-sm ">
          Select {type == "file" ? "a file" : "an image"}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            if (typeof onChange === "function") {
              onChange(e);
            }

            setFilePrevUrl(e ? URL.createObjectURL(e.target.files[0]) : null);
          }}
        />
      </label>

      {type === "image" && (
        <img className="rounded w-4/5 md:w-80" src={filePrevUrl} alt="" />
      )}
      {type === "file" && <iframe src={filePrevUrl} />}
    </div>
  );
};

export default FileInput;
