
export const parseJson = (json: string) => {

  if (/\{[^}]+\}/g.test(json)) {
    const jsonArray = `[${json.replace(/}\s+{/g, '},{')}]`;
    const parsed = JSON.parse(jsonArray);
    return parsed?.length === 1 ? parsed[0] : parsed;
  }

  return JSON.parse(json);
};