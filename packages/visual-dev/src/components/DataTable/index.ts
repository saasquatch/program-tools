import { BannerView } from "./Banner";
import { FilterView } from "./Filter";
import { PaginationView } from "./Pagination";
import { RowView } from "./Row";
import { DataTableView } from "./DataTable";
import { SkeletonView } from "./Skeleton";
import { TableRowView } from "./TableRow";

const DataTableNamespace = Object.assign(DataTableView, {
  RowView: RowView,
  PaginationView: PaginationView,
  BannerView: BannerView,
  FilterView: FilterView,
  SkeletonView: SkeletonView,
  TableRowView: TableRowView,
});

/**
 * @deprecated use {@link DataTableView} instead
 */
const DataTableNamespaceDeprecated = Object.assign(DataTableView, {
  Row: RowView,
  Pagination: PaginationView,
  Banner: BannerView,
  Filter: FilterView,
  Skeleton: SkeletonView,
  TableRow: TableRowView,
});

export { DataTableNamespace as DataTableView };

/**
 * @deprecated use {@link DataTableView} instead
 */
export { DataTableNamespaceDeprecated as DataTable };
