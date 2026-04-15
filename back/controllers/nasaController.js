exports.getImageByNasaId = async (req, res) => {
  try {
    const nasaId = req.query.nasa_id?.trim();

    if (!nasaId) {
      return res.status(400).json({
        ok: false,
        message: 'Falta el parámetro nasa_id en la URL (?nasa_id=...)'
      });
    }

    const url = `https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(nasaId)}&media_type=image`;
    
    console.log('Consultando NASA API:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error de red con la NASA: ${response.status} ${response.statusText}`);
    }

    const dataJson = await response.json();
    const item = dataJson?.collection?.items?.[0];

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
      message: 'Error interno del servidor al consultar NASA'
    });
  }
};