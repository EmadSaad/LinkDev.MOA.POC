import { Injectable } from '@angular/core';

// const prefix = '5be053d20fe18701acabeb9351515f61sd5fsd51f56sd156fgasd1sd';
@Injectable()
export class SessionStorageService {

  get(key: string, isJson: boolean): any {
    let value = sessionStorage.getItem(key);
    value = value && isJson ? JSON.parse(value) : value;
    return value;
  }

  set(key: string, value: any, isJson: boolean): void {
    const val = value && isJson ? JSON.stringify(value) : value;
    sessionStorage.setItem(key, val);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }


}
