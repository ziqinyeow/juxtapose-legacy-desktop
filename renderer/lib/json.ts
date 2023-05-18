import fs from "fs";

export const appendToJSONFile = (file: string, json: {}) => {
  let content = fs.readFileSync(file, "utf-8");
  let parse = JSON.parse(content);
  parse.push(json);
  content = JSON.stringify(parse);
  fs.writeFileSync(file, content, "utf-8");
};

export const editFromJSONFile = (
  file: string,
  id: string | unknown,
  data: {}
) => {
  let content = fs.readFileSync(file, "utf-8");
  let parse = JSON.parse(content);
  let idx = parse?.findIndex((p: any) => p?.id === id);
  parse[idx] = {
    ...parse[idx],
    ...data,
  };
  content = JSON.stringify(parse);
  fs.writeFileSync(file, content, "utf-8");
};

export const deleteFromJSONFile = (file: string, id: string) => {
  let content = fs.readFileSync(file, "utf-8");
  let parse = JSON.parse(content);
  parse = parse?.filter((p: any) => p?.id !== id);
  content = JSON.stringify(parse);
  fs.writeFileSync(file, content, "utf-8");
};
