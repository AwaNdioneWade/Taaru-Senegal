import { ReactNode } from 'react';
import { X } from 'lucide-react';

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'file' | 'tags' | 'date' | 'email' | 'tel';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  min?: number;
  max?: number;
  accept?: string;
  multiple?: boolean;
  rows?: number;
  helpText?: string;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  title: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  submitLabel?: string;
  cancelLabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customFields?: Record<string, ReactNode>;
  error?: string | null;
}

export const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  initialData = {},
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  size = 'md',
  customFields = {},
  error = null,
}: FormModalProps) => {
  if (!isOpen) return null;

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'md':
        return 'max-w-2xl';
      case 'lg':
        return 'max-w-4xl';
      case 'xl':
        return 'max-w-6xl';
      default:
        return 'max-w-2xl';
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    fields.forEach(field => {
      if (field.type === 'file') {
        const files = formData.getAll(field.name);
        data[field.name] = field.multiple ? files : files[0];
      } else {
        data[field.name] = formData.get(field.name);
      }
    });

    onSubmit(data);
  };

  const renderField = (field: FormField) => {
    if (customFields[field.name]) {
      return customFields[field.name];
    }

    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      placeholder: field.placeholder,
      className: "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]",
      defaultValue: initialData[field.name],
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 3}
          />
        );

      case 'select':
        return (
          <select {...commonProps}>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            min={field.min}
            max={field.max}
          />
        );

      case 'file':
        return (
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor={field.name}
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#00853F] hover:text-[#006B32] focus-within:outline-none"
                >
                  <span>Télécharger un fichier</span>
                  <input
                    {...commonProps}
                    type="file"
                    className="sr-only"
                    accept={field.accept}
                    multiple={field.multiple}
                  />
                </label>
                <p className="pl-1">ou glisser-déposer</p>
              </div>
              {field.accept && (
                <p className="text-xs text-gray-500">
                  {field.accept.split(',').join(', ')}
                </p>
              )}
            </div>
          </div>
        );

      case 'tags':
        return (
          <div className="mt-1">
            <input
              {...commonProps}
              type="text"
              placeholder="Appuyez sur Entrée pour ajouter un tag"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {initialData[field.name]?.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00853F] text-white"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 inline-flex items-center"
                    onClick={() => {
                      // TODO: Implémenter la suppression de tag
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <input
            {...commonProps}
            type={field.type}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg w-full ${getSizeClass()} max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
              <p className="font-semibold">Erreur</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                  {field.helpText && (
                    <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00853F]"
              >
                {cancelLabel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] border border-transparent rounded-md hover:bg-[#006B32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00853F]"
              >
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 