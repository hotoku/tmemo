import styled from "styled-components";
import "./App.css";
import { useState } from "react";

const unitLength = "18vw";

type LetterProps = {
  $value: string;
  $hasHeight?: boolean;
  $hasWidth?: boolean;
};

const Letter = styled.div<LetterProps>`
  width: ${(props) => (props.$hasWidth ? "auto" : 0)};
  height: ${(props) => (props.$hasHeight ? "auto" : 0)};
  color: blue;
  &:after {
    content: ${(props) => `"${props.$value}"`};
  }
`;

const Container = styled.div`
  display: flex;
`;

const Pool = styled.div`
  width: calc(${unitLength} * 4);
  height: calc(${unitLength} * 8);
  border: 1px solid black;
  background-color: green;
`;

const ShortRail = styled.div`
  width: calc(${unitLength} * 4);
  height: calc(${unitLength} * 0.5);
  border: 1px solid black;
  background-color: grey;

  display: flex;
  justify-content: space-between;
`;

const LongRail = styled.div`
  width: calc(${unitLength} * 0.5);
  height: calc(${unitLength} * 8);
  border: 1px solid black;
  background-color: grey;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Square = styled.div`
  width: calc(${unitLength} * 0.5);
  height: calc(${unitLength} * 0.5);
  border: 1px solid black;
  background-color: white;
`;

type BallPosition = {
  x: number;
  y: number;
};

const Circle = styled.div`
  width: calc(${unitLength} * 0.2);
  height: calc(${unitLength} * 0.2);
  background-color: blue;
  border-radius: 50%;
`;

function App() {
  const [pos, setPos] = useState<BallPosition | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = event.clientX;
    const y = event.clientY;
    setPos({ x, y });
  };

  return (
    <>
      <Container>
        <Square></Square>
        <ShortRail>
          <Letter $value=""></Letter>
          <Letter $value="|"></Letter>
          <Letter $value="|"></Letter>
          <Letter $value="|"></Letter>
          <Letter $value=""></Letter>
        </ShortRail>
        <Square></Square>
      </Container>
      <Container>
        <LongRail>
          <Letter $value=""></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="●" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value=""></Letter>
        </LongRail>
        <Pool onClick={handleClick}></Pool>
        {pos && (
          <Circle style={{ position: "absolute", left: pos.x, top: pos.y }} />
        )}
        <LongRail>
          <Letter $value=""></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="●" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value="━━" $hasWidth={true}></Letter>
          <Letter $value=""></Letter>
        </LongRail>
      </Container>
      <Container>
        <Square></Square>
        <ShortRail>
          <Letter $value=""></Letter>
          <Letter $value="|"></Letter>
          <Letter $value="|"></Letter>
          <Letter $value="|"></Letter>
          <Letter $value=""></Letter>
        </ShortRail>
        <Square></Square>
      </Container>
    </>
  );
}

export default App;
