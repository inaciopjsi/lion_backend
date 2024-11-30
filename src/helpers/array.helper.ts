export class ArrayHelper {
  static uniqueArray(array: Array<any>) {
    array = array.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  static compareArrayElements(
    arrOne: Array<any> = [],
    arrTwo: Array<any> = [],
  ): boolean {
    return (
      arrOne.length === arrTwo.length &&
      arrOne.every(function (element) {
        return arrTwo.includes(element);
      })
    );
  }
}
