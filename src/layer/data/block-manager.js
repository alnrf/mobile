// @flow
import AsyncStorage from '@react-native-community/async-storage';

const times = {};

const startTime = () => {
  const date = new Date();
  const t = `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

  times[t] = {
    start: date
  };

  return t;
};

const getDuration = t => {
  const date = new Date();
  const startDate = times[t];
  const duration = date - startDate.start;

  times[t] = {
    ...times[t],
    end: date,
    duration
  };

  return `duration: ${duration}`;
};

// ----------------------------------------------------------

const queue = {};
const NB_ITEMS_PER_BLOCKS = 20;

const length = items => Object.keys(items).length;

// ----------------------------------------------------------

export const BLOCK_TYPES = {
  METADATA: 'metadata',
  CARDS: 'cards',
  SLIDES: 'slides'
};

export const getBlock = async blockKey => {
  const t = startTime();
  const block = await AsyncStorage.getItem(blockKey);
  const _block = JSON.parse(block);
  console.log('[block-manager] getBlock', getDuration(t));
  return _block;
};

export const getItem = async (blockType, key) => {
  const t = startTime();
  const metadata = await getBlock(BLOCK_TYPES.METADATA);
  const blockKey = metadata[blockType].keyMap[key];
  console.log({blockKey});
  const block = await getBlock(blockKey);
  const item = block[key];
  console.log(`[block-manager] getItem | ${getDuration(t)} | ${key}`, {key, item});
  return item;
};

const addBlockTypeToMetadata = async (metadata, blockType) => {
  const _metadata = {
    ...metadata,
    [blockType]: {
      currentNum: 1,
      keyMap: {}
    }
  };
  console.log(`[block-manager] addBlockTypeToMetadata '${blockType}'`, _metadata);
  await AsyncStorage.setItem('metadata', JSON.stringify(_metadata));
  return _metadata;
};

const increaseBlockCursor = async blockType => {
  let metadata = await getBlock('metadata');

  metadata = {
    ...metadata,
    [blockType]: {
      ...metadata[blockType],
      currentNum: metadata ? metadata[blockType].currentNum + 1 : 1
    }
  };

  await AsyncStorage.setItem('metadata', JSON.stringify(metadata));
  console.log(`[block-manager] increaseBlockCursor '${blockType}'`, metadata);
  return metadata;
};

const splitItems = (newItems, availableSpace) => {
  const keys = Object.keys(newItems);
  const keysToStoreNow = keys.slice(0, availableSpace);
  const keysToQueue = keys.slice(availableSpace);
  console.log({keysToStoreNow, keysToQueue});

  const pickFromNewItems = (acc, k) => ({...acc, [k]: newItems[k]});
  const itemsToStoreNow = keysToStoreNow.reduce(pickFromNewItems, {});
  const itemsToQueue = keysToQueue.reduce(pickFromNewItems, {});

  return {itemsToStoreNow, itemsToQueue};
};

const createNewBlock = async (blockType, newItems, availableSpace) => {
  const {itemsToStoreNow, itemsToQueue} = splitItems(newItems, availableSpace);
  console.log({itemsToStoreNow, itemsToQueue});
  console.log(
    `[block-manager] not enough room in this block, queueing on top ${length(itemsToQueue)} items`,
    itemsToQueue
  );
  queue[blockType].splice(1, 0, itemsToQueue);
  await increaseBlockCursor(blockType);

  return itemsToStoreNow;
};

const storeBlock = async blockType => {
  const t = startTime();
  console.log(`[block-manager] storeBlock '${blockType}'`);
  let newItems = queue[blockType][0];

  let metadata = await getBlock('metadata');
  if (!metadata) {
    metadata = await addBlockTypeToMetadata({}, blockType);
  }

  if (!metadata[blockType]) {
    metadata = await addBlockTypeToMetadata(metadata, blockType);
  }

  const blockKey = `${blockType}-${metadata[blockType].currentNum}`;

  console.log(`[block-manager] storeBlock items queued: `, newItems);

  const currentBlock = await getBlock(blockKey);
  const currentItems = currentBlock || {};
  const remainingSpace = NB_ITEMS_PER_BLOCKS - Object.keys(currentItems).length;

  if (length(newItems) > remainingSpace) {
    const itemsToStoreNow = await createNewBlock(blockType, newItems, remainingSpace);
    newItems = itemsToStoreNow;
  }

  const mergedItems = {
    ...currentItems,
    ...newItems
  };

  console.log(
    `[block-manager] check to store on block '${blockKey}'(${Object.keys(currentItems).length})`,
    currentItems
  );
  console.log(
    `[block-manager] want to add ${Object.keys(newItems).length} new items in block '${blockKey}'`,
    newItems
  );

  if (Object.keys(mergedItems).length > Object.keys(currentItems).length) {
    console.log(
      `[block-manager] ready to store ${Object.keys(mergedItems).length} mergedItems`,
      mergedItems
    );
    await AsyncStorage.setItem(blockKey, JSON.stringify(mergedItems));

    metadata[blockType].keyMap = Object.keys(mergedItems).reduce(
      (acc, k) => ({...acc, [k]: blockKey}),
      metadata[blockType].keyMap
    );

    await AsyncStorage.setItem(BLOCK_TYPES.METADATA, JSON.stringify(metadata));
    console.log('[block-manager] updated metadata', metadata);

    console.log(
      `[block-manager] store done | ${getDuration(t)} | block: ${blockKey} | nbItems: ${
        Object.keys(mergedItems).length
      }`
    );
  } else {
    console.log(`[block-manager] nothing to store! block is already containing these items`);
  }

  queue[blockType].shift();

  if (queue[blockType].length > 0) {
    console.log(`[block-manager] next storing in queue for block '${blockType}'`);
    return storeBlock(blockType);
  }

  console.log(
    `[block-manager] store queue done | block: ${blockKey} | nbItems: ${
      Object.keys(mergedItems).length
    }`
  );
};

export const store = (blockType, items) => {
  console.log('[block-manager] ==> store');

  if (queue[blockType] && queue[blockType].length > 0) {
    console.log(`[block-manager] queueing for block type '${blockType}'`, items);
    queue[blockType].push(items);
    return;
  }

  console.log(`[block-manager] starting queue for block type '${blockType}'`);
  queue[blockType] = [items];

  return storeBlock(blockType);
};

export const storeOne = async (key, value) => {
  const t = startTime();
  const _value = typeof value === 'object' ? JSON.stringify(value) : value;
  await AsyncStorage.setItem(key, _value);
  console.log(`[block-manager] storeOne | ${getDuration(t)} | ${key}`);
};

export const updateItem = async (key, newValue) => {
  const t = startTime();
  const _value = typeof newValue === 'object' ? JSON.stringify(newValue) : newValue;
  await AsyncStorage.mergeItem(key, _value);
  console.log('[block-manager] updateItem', getDuration(t));
};

export const remove = async key => {
  const t = startTime();
  await AsyncStorage.removeItem(key);
  console.log('[block-manager] remove', getDuration(t));
};
