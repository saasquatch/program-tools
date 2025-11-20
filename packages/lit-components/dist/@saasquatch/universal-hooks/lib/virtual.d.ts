import { ChildPart } from "lit/directive.js";
import { GenericRenderer } from "./core";
interface Renderer<T extends unknown[]> extends GenericRenderer<ChildPart> {
    (this: ChildPart, ...args: T): unknown | void;
}
interface VirtualRenderer<T extends unknown[]> {
    (this: ChildPart, ...args: T): unknown | void;
}
export interface Virtual {
    <T extends unknown[]>(renderer: VirtualRenderer<T>): (...values: T) => unknown;
}
declare function makeVirtual(): Virtual;
export { makeVirtual, Renderer as VirtualRenderer };
