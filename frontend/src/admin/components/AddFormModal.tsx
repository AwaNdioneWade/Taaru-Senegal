import { FormModal, FormField } from './FormModal';
import { modeleFields, utilisateurFields, tailleurFields, commandeFields, tissuFields, accessoireFields, evenementFields, formationFields, moderationFields } from './formConfigs';

type FormType = 'modele' | 'utilisateur' | 'tailleur' | 'commande' | 'tissu' | 'accessoire' | 'evenement' | 'formation' | 'moderation';

interface AddFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
  type: FormType;
}

const getFormConfig = (type: FormType): {
  fields: FormField[];
  title: string;
  submitLabel: string;
} => {
  switch (type) {
    case 'modele':
      return {
        fields: modeleFields,
        title: 'Ajouter un nouveau modèle',
        submitLabel: 'Ajouter le modèle',
      };
    case 'utilisateur':
      return {
        fields: utilisateurFields,
        title: 'Ajouter un nouvel utilisateur',
        submitLabel: 'Ajouter l\'utilisateur',
      };
    case 'tailleur':
      return {
        fields: tailleurFields,
        title: 'Ajouter un nouveau tailleur',
        submitLabel: 'Ajouter le tailleur',
      };
    case 'commande':
      return {
        fields: commandeFields,
        title: 'Ajouter une nouvelle commande',
        submitLabel: 'Ajouter la commande',
      };
    case 'tissu':
      return {
        fields: tissuFields,
        title: 'Ajouter un nouveau tissu',
        submitLabel: 'Ajouter le tissu',
      };
    case 'accessoire':
      return {
        fields: accessoireFields,
        title: 'Ajouter un nouvel accessoire',
        submitLabel: 'Ajouter l\'accessoire',
      };
    case 'evenement':
      return {
        fields: evenementFields,
        title: 'Ajouter un nouvel événement',
        submitLabel: 'Ajouter l\'événement',
      };
    case 'formation':
      return {
        fields: formationFields,
        title: 'Ajouter une nouvelle formation',
        submitLabel: 'Ajouter la formation',
      };
    case 'moderation':
      return {
        fields: moderationFields,
        title: 'Modérer le contenu',
        submitLabel: 'Appliquer la modération',
      };
  }
};

export const AddFormModal = ({ isOpen, onClose, onSubmit, type }: AddFormModalProps) => {
  const { fields, title, submitLabel } = getFormConfig(type);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={title}
      fields={fields}
      submitLabel={submitLabel}
      size="lg"
    />
  );
}; 