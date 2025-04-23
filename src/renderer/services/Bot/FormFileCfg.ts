import type { TUploadableFile } from "@/@types/FormBot";
import type { Ref } from "vue";

const xlsx_file = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

class UploadableFile {
  file: File;
  name: string;
  id: unknown;
  url: string;
  status: string | null;
  type: string;
  constructor(file: File) {
    this.file = file;
    this.name = file.name;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
    this.type = file.type;
  }
}

export default function () {
  function addFiles(newFiles: File[], files: Ref<TUploadableFile[]>) {
    const toAppend = [...newFiles]
      .filter((file) => {
        if (file.type === xlsx_file && !xlsxfileExists(files)) {
          return true;
        } else if (!fileExists(file.name, files) && !checkXlsxType(file)) {
          return true;
        }
        return false;
      })
      .map((file) => new UploadableFile(file));

    return toAppend;
  }
  function checkXlsxType(file: File) {
    return file.type === xlsx_file;
  }

  function fileExists(otherName: string, files: Ref<TUploadableFile[]>) {
    return files.value.some(({ name }) => name === otherName);
  }

  function xlsxfileExists(files: Ref<TUploadableFile[]>) {
    return files.value.some(({ type }) => type === xlsx_file);
  }

  return { addFiles };
}
