import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set = async (key, value) => {
    await Storage.set({ key, value: JSON.stringify(value) });
  };

  get = async (key) => {
    const { value } = await Storage.get({ key });
    return JSON.parse(value);
  };

  remove = async (key) => {
    await Storage.remove({ key });
  };
}
