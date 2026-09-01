export type Strategy =
  | "first-fit"
  | "best-fit"
  | "worst-fit";

export type MemoryBlock = {
  id: number;
  start: number;
  size: number;
  status: "free" | "allocated";
  processId?: number;
};

export type AllocationResult = {
  success: boolean;
  blocks: MemoryBlock[];
  processId?: number;
  message: string;
};


// Find which free block should be used
function findFreeBlock(
  blocks: MemoryBlock[],
  requestedSize: number,
  strategy: Strategy
): number {

  const candidates = blocks
    .map((block, index) => ({
      block,
      index,
    }))
    .filter(
      ({ block }) =>
        block.status === "free" &&
        block.size >= requestedSize
    );

  if (candidates.length === 0) {
    return -1;
  }


  // FIRST FIT
  if (strategy === "first-fit") {
    return candidates[0].index;
  }


  // BEST FIT
  if (strategy === "best-fit") {
    let bestIndex = candidates[0].index;

    for (const candidate of candidates) {
      if (
        candidate.block.size <
        blocks[bestIndex].size
      ) {
        bestIndex = candidate.index;
      }
    }

    return bestIndex;
  }


  // WORST FIT
  let worstIndex = candidates[0].index;

  for (const candidate of candidates) {
    if (
      candidate.block.size >
      blocks[worstIndex].size
    ) {
      worstIndex = candidate.index;
    }
  }

  return worstIndex;
}


// Allocate memory
export function allocateMemory(
  blocks: MemoryBlock[],
  requestedSize: number,
  strategy: Strategy,
  processId: number
): AllocationResult {

  if (requestedSize <= 0) {
    return {
      success: false,
      blocks,
      message:
        "Allocation size must be greater than zero.",
    };
  }


  const index = findFreeBlock(
    blocks,
    requestedSize,
    strategy
  );


  // No suitable block
  if (index === -1) {
    return {
      success: false,
      blocks,
      message:
        `Allocation failed: no suitable block for ${requestedSize} KB.`,
    };
  }


  const target = blocks[index];


  const allocatedBlock: MemoryBlock = {
    id: target.id,
    start: target.start,
    size: requestedSize,
    status: "allocated",
    processId,
  };


  const remainingSize =
    target.size - requestedSize;


  // Perfect fit
  if (remainingSize === 0) {

    const nextBlocks = [...blocks];

    nextBlocks[index] =
      allocatedBlock;

    return {
      success: true,
      blocks: nextBlocks,
      processId,
      message:
        `Process P${processId} allocated ${requestedSize} KB.`,
    };
  }


  // Split the free block
  const remainingBlock: MemoryBlock = {
    id:
      target.id +
      100000 +
      processId,

    start:
      target.start +
      requestedSize,

    size: remainingSize,

    status: "free",
  };


  const nextBlocks = [...blocks];


  nextBlocks.splice(
    index,
    1,
    allocatedBlock,
    remainingBlock
  );


  return {
    success: true,
    blocks: nextBlocks,
    processId,

    message:
      `Process P${processId} allocated ${requestedSize} KB.`,
  };
}


// Free a process
export function freeMemory(
  blocks: MemoryBlock[],
  processId: number
): {
  success: boolean;
  blocks: MemoryBlock[];
  message: string;
} {

  const index = blocks.findIndex(
    (block) =>
      block.status === "allocated" &&
      block.processId === processId
  );


  if (index === -1) {
    return {
      success: false,
      blocks,

      message:
        `Process P${processId} was not found.`,
    };
  }


  const nextBlocks = [...blocks];


  nextBlocks[index] = {
    ...nextBlocks[index],

    status: "free",

    processId: undefined,
  };


  return {
    success: true,

    blocks:
      mergeFreeBlocks(nextBlocks),

    message:
      `Process P${processId} freed successfully.`,
  };
}


// Merge adjacent free blocks
export function mergeFreeBlocks(
  blocks: MemoryBlock[]
): MemoryBlock[] {

  const merged: MemoryBlock[] = [];


  for (const block of blocks) {

    const previous =
      merged[merged.length - 1];


    if (
      previous &&
      previous.status === "free" &&
      block.status === "free" &&
      previous.start +
        previous.size ===
        block.start
    ) {

      previous.size += block.size;

    } else {

      merged.push({
        ...block,
      });

    }
  }


  return merged;
}


// Calculate used memory
export function getUsedMemory(
  blocks: MemoryBlock[]
): number {

  return blocks
    .filter(
      (block) =>
        block.status === "allocated"
    )
    .reduce(
      (total, block) =>
        total + block.size,
      0
    );
}


// Calculate free memory
export function getFreeMemory(
  blocks: MemoryBlock[]
): number {

  return blocks
    .filter(
      (block) =>
        block.status === "free"
    )
    .reduce(
      (total, block) =>
        total + block.size,
      0
    );
}


// Find the largest free block
export function getLargestFreeBlock(
  blocks: MemoryBlock[]
): number {

  return blocks
    .filter(
      (block) =>
        block.status === "free"
    )
    .reduce(
      (largest, block) =>
        Math.max(
          largest,
          block.size
        ),
      0
    );
}


// Calculate external fragmentation
export function getExternalFragmentation(
  blocks: MemoryBlock[]
): number {

  const freeMemory =
    getFreeMemory(blocks);


  if (freeMemory === 0) {
    return 0;
  }


  const largestFreeBlock =
    getLargestFreeBlock(blocks);


  return Math.round(
    (
      (freeMemory -
        largestFreeBlock) /
      freeMemory
    ) * 100
  );
}


// Create initial memory
export function createInitialMemory(
  size: number
): MemoryBlock[] {

  return [
    {
      id: 1,

      start: 0,

      size,

      status: "free",
    },
  ];
}