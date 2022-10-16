// Response에서 Key값만 추가되면 될 때
export type WithKey<T> = T & { key: string | number };
