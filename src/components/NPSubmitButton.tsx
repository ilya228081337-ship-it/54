import { Button } from 'reactstrap';

interface NPSubmitButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export const NPSubmitButton = ({ onClick, label, disabled = false }: NPSubmitButtonProps) => {
  return (
    <Button color="primary" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};
