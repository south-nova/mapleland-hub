export interface Item {
  id: number;
  code: string;
  name: string;
  description: string | null;
}

export const searchItems = async (query: string) => {
  try {
    const name = query.trim().replace(/\s+/g, '');
    const items = await window.ipc.invoke('search-items', name);
    return items;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};
