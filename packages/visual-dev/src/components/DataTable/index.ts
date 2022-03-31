import { BannerView } from "./Banner";
import { FilterView } from "./Filter";
import { PaginationView } from "./Pagination";
import { RowView } from "./Row";
import { DataTableView } from "./DataTable";
import { SkeletonView } from "./Skeleton";

const DataTableNamespace = Object.assign(DataTableView, {
  RowView: RowView,
  PaginationView: PaginationView,
  BannerView: BannerView,
  FilterView: FilterView,
  SkeletonView: SkeletonView,
});

const DataTableNamespaceDeprecated = Object.assign(DataTableView, {
  Row: RowView,
  Pagination: PaginationView,
  Banner: BannerView,
  Filter: FilterView,
  Skeleton: SkeletonView,
});

export { DataTableNamespace as DataTableView };

/**
 * @deprecated use {@link DataTableView} instead
 */
export { DataTableNamespaceDeprecated as DataTable };
