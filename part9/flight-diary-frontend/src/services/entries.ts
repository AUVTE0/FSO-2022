import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

export const getAll = () => {
  return axios
    .get<DiaryEntry[]>(apiBaseUrl)
    .then(response => response.data)
}
export const create = (object: NewDiaryEntry) => {
  return axios
    .post<NewDiaryEntry>(apiBaseUrl, object)
    .then(response => response.data)
}

export default {
  getAll, create
};

