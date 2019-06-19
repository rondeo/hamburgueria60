import React from 'react';

import Box from 'infrastructure/shared/Box';

export default function EmptyState() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1"
      alignItems="center"
      ml={2}
      mr={2}
    >
      <Box
        mt="auto"
        mb={1}
        textAlign="center"
        fontWeight="300"
        color="text.secondary"
        variant="h5"
      >
        Nenhum item adicionado
      </Box>
      <Box
        mb="auto"
        textAlign="center"
        fontWeight="300"
        color="text.secondary"
        variant="h6"
      >
        Clique em (+) para adicionar items
      </Box>
    </Box>
  );
}
