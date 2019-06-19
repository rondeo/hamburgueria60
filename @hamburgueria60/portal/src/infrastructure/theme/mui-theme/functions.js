export function spacing(multiplier = 1) {
  // TODO: temporary
  return () => 8 * multiplier;
}

export function color(variant = 'primary', type = 'main') {
  const fn = props => props.theme.palette[variant][type];
  fn.modifier = modifier => props =>
    modifier(props.theme.palette[variant][type]);
  return fn;
}

export function rawColor(code) {
  const fn = () => code;
  fn.modifier = modifier => () => modifier(code);
  return fn;
}
