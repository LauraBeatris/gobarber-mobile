/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Extracts the id property of each flat list item
 */
export const keyExtractorId = (item: any & {
  id: number | string;
}) => item.id;
