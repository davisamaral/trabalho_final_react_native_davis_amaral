import IStore from "../Interfaces/IStore";

export default interface IProduct{
  "_id": string,
  "name": string,
  "price": string,
  "favorite": boolean,
}