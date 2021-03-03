// https://basarat.gitbook.io/typescript/type-system/intro/d.ts
declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}