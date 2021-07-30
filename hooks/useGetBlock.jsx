import { useCallback } from 'react';

export default function useGetBlock(blocks) {
  return useCallback(
		(name) => blocks.find((block) => block.blockName === name),
		[blocks]
	)
}