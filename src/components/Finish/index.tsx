import * as C from "./styles";
import joinIcon from "../../svgs/join.svg";

export const FinishComp = () => {
  return (
    <C.Container>
      <img src={joinIcon} alt="Icon Like" />
      <h1>Você Completou tudo</h1>
    </C.Container>
  );
};
