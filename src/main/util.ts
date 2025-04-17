import isDev from "electron-is-dev";

export const options =

  (opt: string, formdata: formType, filepath: string): Array<string> => {

    const opts: Record<string, Array<string>> = {
      InformaSentencas: [
        "/c", "py", "-3.13", "-m",
        "interface_robo",
        "--bot",
        "InformaSentencas",
        "--username",
        formdata.username,
        "--password",
        formdata.password,
        "--xlsx",
        filepath,
      ],
      ExtractIntimacoes: [
        "/c", "py", "-3.13", "-m",
        "interface_robo",
        "--bot",
        "ExtractIntimacoes",
        "--pastas",
        formdata.pastas,
        "--email",
        formdata.email,
      ],
      AnaliseApagao: [
        "/c", "py", "-3.13", "-m",
        "interface_robo",
        "--bot",
        "AnaliseApagao",
        "--api_key",
        formdata.api_key,
        "--xlsx",
        filepath,
      ],
    };

    let options_exec = opts[opt];
    if (isDev) {
      options_exec = ["/c", "poetry", "run", ...options_exec.slice(4)];
    }

    return options_exec;
  };
