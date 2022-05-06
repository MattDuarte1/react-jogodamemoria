import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/InfoItem";
import { Button } from "./components/Button";
import { GridItemType } from "./types/GridItemType";
import { GridItem } from "./components/GridItem";
import { items } from "./data/items";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";
import { FinishComp } from "./components/Finish";

function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verifica se são iguais
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);

      if (opened.length === 2) {
        // primeira verificação - se são iguais, vai tornar permanente.
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          // segunda verificação - se não sao iguais fecha eles.
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShown === true)
    ) {
      setPlaying(false);
      setFinish(true);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    // passo 1 - reseta o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    setFinish(false);

    // passo 2 - cria o grid
    // 2.1 - criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({ item: null, shown: false, permanentShown: false });
    }

    // 2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    // 2.3 - jogar no state
    setGridItems(tmpGrid);
    // passo 3 - começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanentShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tmpGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="Logo" width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea opacity={finish}>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
          {finish && <FinishComp />}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;
