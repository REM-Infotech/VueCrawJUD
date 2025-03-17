import { ref } from "vue";

export default function () {
  const table_file = ref();

  const FilesListable = ref<{ index: number; file: [UploadableFile, string] }[]>([]);
  const files = ref<UploadableFile[]>([]);

  const columns = [
    {
      data: "index",
      title: "#",
    },
    {
      data: "file",
      title: "Nome do arquivo",
    },
  ];

  function addFiles(newFiles) {
    const newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
    files.value.map((file, i = 0) => {
      FilesListable.value.push({
        index: i,
        file: [file, file.file.name],
      });
      i++;
    });
  }

  function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId);
  }

  function removeFile(file) {
    const index = files.value.indexOf(file);

    if (index > -1) files.value.splice(index, 1);
  }

  return { files, addFiles, removeFile, FilesListable, table_file, columns };
}

class UploadableFile {
  file: File;
  id: unknown;
  url: string;
  status: string | null;
  constructor(file) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
  }
}
