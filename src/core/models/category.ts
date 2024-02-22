export default interface ICategory extends ICategoryPost {
  _id: string;
}

export interface ICategoryPost {
  name: string;
  value: string;
}
