import Input from "@mui/joy/Input";
import React from "react";
import "./_styles.css";

interface IStandarInput {
  text: string;
  styles?: React.CSSProperties,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearValue: string;
  error?: boolean;
}

export default function StandarInput({ text, styles, onChange, clearValue, error }: IStandarInput): JSX.Element {
  return (
    <Input
      className="standar_input"
      style={styles}
      color={error ? 'danger' : 'neutral'}
      size="md"
      variant="outlined"
      sx={{
        "--Input-focusedHighlight": `${error ? 'red' : 'black'}`,
      }}
      value={clearValue}
      placeholder={text}
      onChange={onChange}
    />
  );
}
