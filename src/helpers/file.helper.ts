import { rename } from 'node:fs';
import * as path from 'path';

export class FileHelper {
  static async moveFileRelativePaths(oldPath: string, newPath: string) {
    const oldFullPath = this._fixpath(oldPath);
    const newFullPath = this._fixpath(newPath);
    return new Promise((resolve) => {
      rename(oldFullPath, newFullPath, (err) => resolve(err === null));
    });
  }

  private static _fixpath(pathRelative: string): any {
    if (pathRelative.startsWith('/')) {
      pathRelative = pathRelative.substring(1);
    }
    return path.resolve(__dirname, '..', pathRelative);
  }
}
