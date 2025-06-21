import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Eye,
} from 'lucide-react';
import {
  sortData,
  filterData,
  paginateData,
  getTotalPages,
  getColumnWidth,
  TableState,
  SortConfig,
  FilterConfig,
} from './tableUtils';

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  searchable?: boolean;
  mobileView?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  searchFields?: string[];
  initialFilters?: FilterConfig[];
  showPreviewButton?: boolean;
  onPreviewClick?: (item: T) => void;
}

export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  itemsPerPage = 10,
  searchable = true,
  mobileView,
  onRowClick,
  searchFields = [],
  initialFilters = [],
  showPreviewButton = false,
  onPreviewClick,
}: DataTableProps<T>) => {
  const [tableState, setTableState] = useState<TableState>({
    currentPage: 1,
    itemsPerPage,
    sortConfig: null,
    filters: initialFilters,
    searchQuery: '',
  });

  // Gestion du tri
  const handleSort = (header: string) => {
    setTableState(prev => {
      const currentDirection = prev.sortConfig?.key === header ? prev.sortConfig.direction : null;
      const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
      
      return {
        ...prev,
        sortConfig: { key: header, direction: newDirection },
      };
    });
  };

  // Gestion de la recherche
  const handleSearch = (query: string) => {
    setTableState(prev => ({
      ...prev,
      searchQuery: query,
      currentPage: 1, // Réinitialiser la page lors d'une recherche
    }));
  };

  // Gestion des filtres
  const handleFilter = (filter: FilterConfig) => {
    setTableState(prev => ({
      ...prev,
      filters: [...prev.filters.filter(f => f.field !== filter.field), filter],
      currentPage: 1,
    }));
  };

  // Gestion de la pagination
  const handlePageChange = (page: number) => {
    setTableState(prev => ({
      ...prev,
      currentPage: page,
    }));
  };

  // Traitement des données
  const processedData = useMemo(() => {
    let result = [...data];

    // Application des filtres et de la recherche
    result = filterData(
      result,
      tableState.filters,
      tableState.searchQuery,
      searchFields
    );

    // Application du tri
    result = sortData(result, tableState.sortConfig, columns);

    return result;
  }, [data, tableState.filters, tableState.searchQuery, tableState.sortConfig, columns, searchFields]);

  // Pagination des données
  const paginatedData = useMemo(() => {
    return paginateData(
      processedData,
      tableState.currentPage,
      tableState.itemsPerPage
    );
  }, [processedData, tableState.currentPage, tableState.itemsPerPage]);

  const totalPages = getTotalPages(processedData.length, tableState.itemsPerPage);

  // Ajouter le bouton de prévisualisation à la dernière colonne si nécessaire
  const columnsWithPreview = useMemo(() => {
    if (!showPreviewButton) return columns;

    const lastColumn = columns[columns.length - 1];
    if (lastColumn.header === 'Actions') {
      return [
        ...columns.slice(0, -1),
        {
          ...lastColumn,
          accessor: (item: T) => (
            <div className="flex items-center justify-end space-x-2">
              {onPreviewClick && (
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreviewClick(item);
                  }}
                >
                  <Eye className="w-5 h-5" />
                </button>
              )}
              {lastColumn.accessor(item)}
            </div>
          ),
        },
      ];
    }
    return columns;
  }, [columns, showPreviewButton, onPreviewClick]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Barre de recherche */}
      {searchable && (
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={tableState.searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}

      {/* Vue mobile */}
      {mobileView && (
        <div className="lg:hidden divide-y">
          {paginatedData.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick?.(item)}
            >
              {mobileView(item)}
            </div>
          ))}
        </div>
      )}

      {/* Vue desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columnsWithPreview.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:text-gray-700' : ''
                  }`}
                  style={{ width: getColumnWidth(column) }}
                  onClick={() => column.sortable && handleSort(column.header)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && tableState.sortConfig?.key === column.header && (
                      tableState.sortConfig.direction === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columnsWithPreview.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.accessor(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(tableState.currentPage - 1)}
              disabled={tableState.currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button
              onClick={() => handlePageChange(tableState.currentPage + 1)}
              disabled={tableState.currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de{' '}
                <span className="font-medium">
                  {(tableState.currentPage - 1) * tableState.itemsPerPage + 1}
                </span>{' '}
                à{' '}
                <span className="font-medium">
                  {Math.min(
                    tableState.currentPage * tableState.itemsPerPage,
                    processedData.length
                  )}
                </span>{' '}
                sur{' '}
                <span className="font-medium">{processedData.length}</span>{' '}
                résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(tableState.currentPage - 1)}
                  disabled={tableState.currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === tableState.currentPage
                        ? 'z-10 bg-[#00853F] border-[#00853F] text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(tableState.currentPage + 1)}
                  disabled={tableState.currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 