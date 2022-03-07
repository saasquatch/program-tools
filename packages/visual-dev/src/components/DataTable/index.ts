import { Banner } from "./Banner";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { Row } from "./Row";
import { DataTable } from "./DataTable";
import { Skeleton } from "./Skeleton";

const DataTableNamespace = Object.assign(DataTable, {
  Row: Row,
  Pagination: Pagination,
  Banner: Banner,
  Filter: Filter,
  Skeleton: Skeleton,
});

export { DataTableNamespace as DataTable };
