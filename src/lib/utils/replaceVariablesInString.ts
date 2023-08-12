export function replaceVariablesInString(
  text: string,
  data: Record<string, string>,
) {
  const regex = new RegExp("\\${(" + Object.keys(data).join("|") + ")}", "g");
  return text.replace(regex, (m, p1) => data[p1] || m);
}
