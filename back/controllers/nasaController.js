const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

exports.getImageByNasaId = async (req, res) => {
  try {
    const nasaId = req.query.nasa_id;

    if (!nasaId) {
      return res.status(400).json({
        ok: false,
        message: 'Falta el parámetro nasa_id'
      });
    }

    const query = `nasa_id=${encodeURIComponent(String(nasaId))}&media_type=image`;
    const apiKeyParam = process.env.API_KEY ? `&api_key=${encodeURIComponent(process.env.API_KEY)}` : '';
    const url = `https://images-api.nasa.gov/search?${query}${apiKeyParam}`;

    const response = await fetchJson(url);
    const item = response?.collection?.items?.[0];

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: 'No se encontró la imagen NASA con ese ID'
      });
    }

    const data = item.data?.[0] || {};
    const imageUrl = item.links?.[0]?.href || '';

    res.status(200).json({
      ok: true,
      image: {
        title: data.title || 'Imagen NASA',
        description: data.description || 'Sin descripción disponible.',
        imageUrl,
        dateCreated: data.date_created || data.date || '',
        center: data.center || 'NASA',
        keywords: data.keywords || []
      }
    });
  } catch (error) {
    console.error('Error NASA API:', error);
    res.status(500).json({
      ok: false,
      message: 'Error obteniendo datos de NASA'
    });
  }
};
