const http = require('@actions/http-client');
const config = require('./config');
const { isEmpty } = require('./validate');
const { Variable } = require('./enums');

class HttpClient {
  constructor() {
    this.client = new http.HttpClient();
    this.client.requestOptions = {
      headers: {
        authorization: `Bearer ${process.env[Variable.NULLPLATFORM_ACCESS_TOKEN]}`,
        [http.Headers.ContentType]: 'application/json',
      },
    };
    this.baseUrl = config.baseUrl;
  }

  async get(path, query) {
    let url = `${this.baseUrl}/${path}`;
    if (!isEmpty(query)) {
      url = `${url}?${query}`;
    }
    const response = await this.client.get(url);
    const { statusCode, statusMessage } = response.message;
    const result = await response.readBody();
    if (statusCode !== 200) {
      throw new Error(
        `GET to ${url} failed: [${statusCode}] ${statusMessage} - ${result}`,
      );
    }
    return JSON.parse(result);
  }
}

module.exports = HttpClient;
