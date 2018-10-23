import WRISerializer from 'wri-json-api-serializer';

// actions
import { fetchLayer } from 'modules/layers/actions';

// constants
import { FETCH_DATASET_ID } from 'constants/hazard';

export const fecthSideMap = (queryParams) =>
  new Promise ((resolve) => {
    fetch(`${process.env.WRI_API_URL}/v1/dataset/${FETCH_DATASET_ID}/layer/vocabulary/find?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(response => WRISerializer(response))
      .then((data = []) => {
        const layerIds = ((data[0] || {}).resources || []).map(_layer => _layer.id);
        const promises = layerIds.map(_layerId => fetchLayer(_layerId));

        Promise.all(promises)
          .then((_layers => {
            resolve(_layers)
          }));
      });
  })

  export default { fecthSideMap };
