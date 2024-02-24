// copyNodes.js (inside utils directory)
const axios = require('axios');
const figmaAccessToken = process.env.FIGMA_ACCESS_TOKEN;

const copyNodes = async (sourceFileKey, nodeIds) => {
  try {
    const response = await axios.post(
      `https://api.figma.com/v1/files/${sourceFileKey}/copy`,
      {
        nodes: nodeIds,
      },
      {
        headers: {
          'X-Figma-Token': figmaAccessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = copyNodes;
