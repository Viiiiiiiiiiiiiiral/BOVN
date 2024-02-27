export interface IPaginateParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  status?: string;
  companyId?: string;
  roleIds?: string;
  ignoreDeleted?: string;
}
