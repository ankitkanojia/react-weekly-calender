export type ClassNames = typeof import('./styles/styles.module.scss').default;

export type EventRootProps = {
  className?: string;
  classes: ClassNames;
  style?: React.CSSProperties;
  cellIndex: number;
  rangeIndex: number;
  isActive: boolean;
  disabled?: boolean;
  handleDelete(): void;
};