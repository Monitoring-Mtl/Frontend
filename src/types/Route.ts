import { Direction } from "./Direction";

export type Route = {
    id:string;
    name:string;
    shortName:string;
    directions:Direction[]
}