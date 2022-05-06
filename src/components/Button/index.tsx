import * as C from "./styles";

type Props = {
  label: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  icon?: any;
};

export const Button = ({ label, onClick, icon }: Props) => {
  return (
    <C.Container onClick={onClick}>
      {icon && (
        <C.IconArea>
          <C.Icon src={icon} />
        </C.IconArea>
      )}
      <C.Label>{label}</C.Label>
    </C.Container>
  );
};
