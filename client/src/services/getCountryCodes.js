const getCountryCodes = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      const codes = data
        .filter(c => c.idd?.root)
        .map(c => ({
          name: c.name.common,
          code: c.idd.root + (c.idd.suffixes?.[0] || '')
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      return codes;
    } catch (err) {
      console.error('Failed to fetch country codes:', err);
      return [];
    }
  };
  
  export default getCountryCodes;
  