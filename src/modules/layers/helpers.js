import WRISerializer from 'wri-json-api-serializer';

// actions
import { fetchLayer } from 'modules/layers/actions';

// constants
import { FETCH_CBA_DATASET_ID } from 'constants/analyzer';

export const fecthSideMap = (queryParams) =>
  new Promise ((resolve) => {
    const params = {
      ...queryParams,
      application: 'aqueduct',
    };
    fetch(`${process.env.REACT_APP_WRI_API_URL}/v1/dataset/${FETCH_CBA_DATASET_ID}/layer/vocabulary/find?${params}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(response => WRISerializer(response))
      .then((data = []) => {
        const layerIds = ((data[0] || {}).resources || []).map(_layer => _layer.id);
        const promises = layerIds.map(_layerId => fetchLayer(_layerId, FETCH_CBA_DATASET_ID));

        Promise.all(promises)
          .then((_layers => {
            resolve(_layers)
          }));
      });
  })

  export default { fecthSideMap };
