const vaule1: any = 1;
const vaule2: unknown = 3;
const vaule3: any = vaule2;
const value4: unknown = vaule1;
// const vaule5: string = vaule2; // unknown类型不可以赋值给string类型
const value6: string = vaule1; // any类型可以赋值给string类型
const value7: unknown = vaule2;

