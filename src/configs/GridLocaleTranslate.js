export const GRID_LOCALE_TEXT = {
  // Root
  noRowsLabel: '没有内容',
  noResultsOverlayLabel: '未找到任何结果.',
  errorOverlayDefaultLabel: '发生了一个错误.',

  // Density selector toolbar button text
  toolbarDensity: '紧密程度',
  toolbarDensityLabel: '紧密程度',
  toolbarDensityCompact: '紧凑',
  toolbarDensityStandard: '标准',
  toolbarDensityComfortable: '舒适',

  // Columns selector toolbar button text
  toolbarColumns: '列',
  toolbarColumnsLabel: '选择列',

  // Filters toolbar button text
  toolbarFilters: '筛选',
  toolbarFiltersLabel: '显示筛选条件',
  toolbarFiltersTooltipHide: 'Hide filters',
  toolbarFiltersTooltipShow: 'Show filters',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,

  // Export selector toolbar button text
  toolbarExport: '导出',
  toolbarExportLabel: '导出',
  toolbarExportCSV: '下载为 .csv 文件',
  toolbarExportPrint: '打印',

  // Columns panel text
  columnsPanelTextFieldLabel: '查找列',
  columnsPanelTextFieldPlaceholder: '列名',
  columnsPanelDragIconLabel: '重新排列',
  columnsPanelShowAllButton: '显示全部',
  columnsPanelHideAllButton: '隐藏全部',

  // Filter panel text
  filterPanelAddFilter: '添加筛选条件',
  filterPanelDeleteIconLabel: '删除',
  filterPanelOperators: '运算符',
  filterPanelOperatorAnd: '和',
  filterPanelOperatorOr: '或',
  filterPanelColumns: '列名称',
  filterPanelInputLabel: '值',
  filterPanelInputPlaceholder: 'Filter value',

  // Filter operators text
  filterOperatorContains: '包含',
  filterOperatorEquals: '等于',
  filterOperatorStartsWith: 'starts with',
  filterOperatorEndsWith: 'ends with',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',
  filterOperatorIsEmpty: '空的',
  filterOperatorIsNotEmpty: '非空',

  // Filter values text
  filterValueAny: '任意',
  filterValueTrue: 'true',
  filterValueFalse: 'false',

  // Column menu text
  columnMenuLabel: '菜单',
  columnMenuShowColumns: '选择显示列',
  columnMenuFilter: '筛选',
  columnMenuHideColumn: '隐藏',
  columnMenuUnsort: '取消排序',
  columnMenuSortAsc: '升序',
  columnMenuSortDesc: '降序',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,
  columnHeaderFiltersLabel: 'Show filters',
  columnHeaderSortIconLabel: '排序',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `选中 ${count.toLocaleString()} 行`
      : `选中 ${count.toLocaleString()} 行`,

  // Total rows footer text
  footerTotalRows: '总行数:',

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox selection',

  // Boolean cell text
  booleanCellTrueLabel: 'true',
  booleanCellFalseLabel: 'false',

  // Actions cell more text
  actionsCellMore: 'more',

  // Used core components translation keys
  MuiTablePagination: {},
};