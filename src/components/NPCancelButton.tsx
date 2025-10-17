import { Button } from 'reactstrap';

interface NPCancelButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export const NPCancelButton = ({ onClick, label, disabled = false }: NPCancelButtonProps) => {
  return (
    <Button color="secondary" onClick={onClick} disabled={disabled} className="me-2">
      {label}
    </Button>
  );
};
