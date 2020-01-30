import http from 'http'


async function curlGETRaw(url: string): Promise<string> {
  return new Promise((onDone, onReject) => {
    http.get(url, (response) => {
      const { statusCode } = response;

      if (statusCode !== 200) {
        onReject('Error: ' + statusCode);
        return;
      }
      
      let rawData = '';
      response.on('data', (chunk) => rawData += chunk);
      response.on('end', () => onDone(rawData));
    })
  });
}

async function curlGETJson<T>(url: string): Promise<T> {
  return JSON.parse(await curlGETRaw(url))
}

export {curlGETJson, curlGETRaw}