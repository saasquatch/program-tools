// import { BreadcrumbLinkProps } from "../SmallViews/BreadcrumbLink";

export function isBlank(str?: string) {
  return !str || /^\s*$/.test(str);
}

//Logan didn't want it - had non-existant saasquatch links
// export const getfullPath = (pathArray: Array<string>, index: number) => {
//   let fullPath: string = "";
//   for (let i = 0; i < index; i++) {
//     fullPath = fullPath + pathArray[i] + "/";
//   }
//   return fullPath;
// };

// export const getBreadcrumb = (link: string) => {
//   const fullPath: string = new URL(link).pathname;
//   const noStartEndSlashes: string = fullPath.slice(1, -1);
//   const pathArray: Array<string> = noStartEndSlashes.split("/");
//   const pathObjectsArray: Array<BreadcrumbLinkProps> = [];
//   for (let i = 0; i < pathArray.length; i++) {
//     const tempPathObject = {
//       link: "https://docs.saasquatch.com/" + getfullPath(pathArray, i + 1),
//       linkName:
//         i + 1 === pathArray.length ? pathArray[i] : pathArray[i] + " > ",
//     };
//     pathObjectsArray.push(tempPathObject);
//   }
//   return pathObjectsArray;
// };
