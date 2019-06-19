import Chip from '@material-ui/core/Chip';
import React, { useCallback } from 'react';

import Box from '../Box';

export default function ChipControl({
  checked,
  value,
  onChange,
  inputRef,
  ...props
}) {
  const handleClick = useCallback(() => {
    if (onChange) onChange({ target: { value } }, checked);
  });
  return (
    <Box mr={1} mb={1}>
      <Chip
        {...props}
        onClick={handleClick}
        color={checked ? 'primary' : undefined}
      />
    </Box>
  );
}
