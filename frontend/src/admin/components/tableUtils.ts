import { Column } from './DataTable';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  field: string;
  value: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
}

export interface TableState {
  currentPage: number;
  itemsPerPage: number;
  sortConfig: SortConfig | null;
  filters: FilterConfig[];
  searchQuery: string;
}

export const sortData = <T extends Record<string, any>>(
  data: T[],
  sortConfig: SortConfig | null,
  columns: Column<T>[]
): T[] => {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    const column = columns.find(col => col.header === sortConfig.key);
    if (!column) return 0;

    const aValue = column.accessor(a);
    const bValue = column.accessor(b);

    // Gestion des valeurs numériques
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Gestion des dates
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortConfig.direction === 'asc' 
        ? aValue.getTime() - bValue.getTime() 
        : bValue.getTime() - aValue.getTime();
    }

    // Gestion des chaînes de caractères
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    if (sortConfig.direction === 'asc') {
      return aString.localeCompare(bString);
    }
    return bString.localeCompare(aString);
  });
};

export const filterData = <T extends Record<string, any>>(
  data: T[],
  filters: FilterConfig[],
  searchQuery: string,
  searchFields: string[]
): T[] => {
  return data.filter(item => {
    // Filtres spécifiques
    const matchesFilters = filters.every(filter => {
      const value = item[filter.field];
      switch (filter.operator) {
        case 'equals':
          return String(value).toLowerCase() === filter.value.toLowerCase();
        case 'contains':
          return String(value).toLowerCase().includes(filter.value.toLowerCase());
        case 'startsWith':
          return String(value).toLowerCase().startsWith(filter.value.toLowerCase());
        case 'endsWith':
          return String(value).toLowerCase().endsWith(filter.value.toLowerCase());
        case 'greaterThan':
          return Number(value) > Number(filter.value);
        case 'lessThan':
          return Number(value) < Number(filter.value);
        default:
          return true;
      }
    });

    // Recherche globale
    const matchesSearch = !searchQuery || searchFields.some(field => {
      const value = item[field];
      return String(value).toLowerCase().includes(searchQuery.toLowerCase());
    });

    return matchesFilters && matchesSearch;
  });
};

export const paginateData = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  columns: Column<T>[],
  filename: string
): void => {
  // En-têtes
  const headers = columns.map(col => col.header);
  
  // Données
  const rows = data.map(item => 
    columns.map(col => {
      const value = col.accessor(item);
      // Gestion des valeurs complexes (objets, tableaux, etc.)
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
      }
      return value;
    })
  );

  // Création du CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Création du blob et téléchargement
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = <T extends Record<string, any>>(
  data: T[],
  columns: Column<T>[],
  filename: string
): void => {
  // TODO: Implémenter l'export Excel
  console.log('Export Excel à implémenter');
};

export const getColumnWidth = (column: Column<any>): string => {
  if (column.width) return column.width;
  
  // Largeurs par défaut selon le type de contenu
  switch (column.header) {
    case 'Actions':
      return '100px';
    case 'Statut':
    case 'Catégorie':
      return '120px';
    case 'Prix':
      return '150px';
    case 'Date':
    case 'Mise à jour':
      return '180px';
    default:
      return 'auto';
  }
};

export const getInitialTableState = (itemsPerPage: number = 10): TableState => ({
  currentPage: 1,
  itemsPerPage,
  sortConfig: null,
  filters: [],
  searchQuery: '',
}); 