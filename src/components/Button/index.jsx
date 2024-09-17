import { Button } from '@mui/material';

const ButtonComp = ({ children, onClick, variant, ...restProps }) => {
  return (
    <Button onClick={onClick} variant={variant} {...restProps}>
      {children}
    </Button>
  );
};

export default ButtonComp;
