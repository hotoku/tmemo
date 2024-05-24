import { ChangeEvent, ChangeEventHandler } from "react";
import { BallSelect } from "../types";
import { useAtom } from "jotai";
import { ballSeelctionAtom } from "../atoms";

type BallSelectionProps = {
  selected: BallSelect;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function BallSelection({
  selected,
  onChange,
}: BallSelectionProps): JSX.Element {
  const options = ["object", "cue"];
  return (
    <>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selected === option}
            onChange={onChange}
          />
          {option}
        </label>
      ))}
    </>
  );
}

function Header(): JSX.Element {
  const [selected, setSelected] = useAtom(ballSeelctionAtom);
  return (
    <>
      <BallSelection
        selected={selected}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === "object" || e.target.value === "cue") {
            setSelected(e.target.value);
          } else {
            throw new Error(`unknown selection: ${e.target.value}`);
          }
        }}
      />
    </>
  );
}

export default Header;
