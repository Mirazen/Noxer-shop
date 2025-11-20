const API_BASE = 'https://noxer-test.ru/webapp/api';

export const getMainProducts = async () => {
  try {
    const response = await fetch(`${API_BASE}/products/on_main`);
    if (!response.ok) throw new Error('Failed to fetch main products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching main products:', error);
    return null;
  }
};

export const filterProducts = async (filters = {}, page = 1, perPage = 50) => {
  try {
    const url = `${API_BASE}/products/filter?per_page=${perPage}&page=${page}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    if (!response.ok) throw new Error('Failed to filter products');
    return await response.json();
  } catch (error) {
    console.error('Error filtering products:', error);
    return null;
  }
};
