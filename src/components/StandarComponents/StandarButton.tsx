import Button from "@mui/joy/Button";
import React from "react";
import "./_styles.css";

interface StandarButtonProps {
  text: string;
  styles?: React.CSSProperties;
  disabled: boolean;
  onClick: () => void;
  loading: boolean;
}

export default function StandarButton({ text, styles, disabled, onClick, loading }: StandarButtonProps): JSX.Element {
  return (
    <Button className="standar_button" color="primary" style={styles} disabled={disabled} variant="solid" onClick={onClick} loading={loading}>
      {text}
    </Button>
  );
}
