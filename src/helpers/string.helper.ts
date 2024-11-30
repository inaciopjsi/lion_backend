export class StringHelper {
  public static isNullOrWhitespace(input: string | null | undefined) {
    if (typeof input === 'undefined' || input === null) {
      return true;
    }
    return input.replace(/\s/g, '').length < 1;
  }

  public static isEqual(string1: string, string2: string) {
    return string1.toLowerCase().localeCompare(string2.toLowerCase()) == 0;
  }
}
