import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ballSeelctionAtom } from "../atoms";

const unitLength = "18vw";
const vwInPixel = window.innerWidth / 100;
const unitLengthPx = 18 * vwInPixel;

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

const Field = styled.div`
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

type Vector = {
  x: number;
  y: number;
};

type CircleProps = {
  $color: string;
};

const circleDiameterUnit = 0.2;
const circleDiameterPx = circleDiameterUnit * unitLengthPx;
const Circle = styled.div<CircleProps>`
  width: calc(${unitLength} * ${circleDiameterUnit});
  height: calc(${unitLength} * ${circleDiameterUnit});
  background-color: ${(props) => props.$color};
  border-radius: 50%;
`;

function Table(): JSX.Element {
  const [obPos, setObPos] = useState<Vector | null>(null);
  const [cbPos, setCbPos] = useState<Vector | null>(null);
  const [selected, setSelected] = useAtom(ballSeelctionAtom);
  const ref = useRef<HTMLDivElement>(null);
  const [corner, setCorner] = useState<Vector>({ x: 0, y: 0 });

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = event.clientX;
    const y = event.clientY;
    if (selected === "cue") {
      setCbPos({
        x: x - corner.x - 0.5 * circleDiameterPx,
        y: y - corner.y - 0.5 * circleDiameterPx,
      });
      setSelected("object");
    } else if (selected === "object") {
      setObPos({
        x: x - corner.x - 0.5 * circleDiameterPx,
        y: y - corner.y - 0.5 * circleDiameterPx,
      });
      setSelected("cue");
    } else {
      throw new Error(`unknown selection: ${selected}`);
    }
  };

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCorner({ x: rect.left, y: rect.top });
    }
  });

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
        <Field onClick={handleClick} ref={ref}></Field>
        {obPos && (
          <Circle
            style={{
              position: "absolute",
              left: `${obPos.x + corner.x}px`,
              top: `${obPos.y + corner.y}px`,
            }}
            $color="blue"
          />
        )}
        {cbPos && (
          <Circle
            style={{
              position: "absolute",
              left: `${cbPos.x + corner.x}px`,
              top: `${cbPos.y + corner.y}px`,
            }}
            $color="white"
          />
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

export default Table;
