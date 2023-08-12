const dotenv = require('dotenv');
const core = require('@actions/core');
const HttpClient = require('./client');
const { isEmpty } = require('./validate');
const { Input } = require('./enums');

dotenv.config();

const client = new HttpClient();

const setFailed = (error) => {
  core.setFailed(error);
  process.exit(1);
};

async function run() {
  try {
    const applicationId = core.getInput(Input.APPLICATION_ID);

    core.info('Validating inputs...');

    if (isEmpty(applicationId)) {
      setFailed(`Input "${Input.APPLICATION_ID}" cannot be empty`);
    }

    const parameters = await client.get(`application/${applicationId}/parameter`);

    // eslint-disable-next-line no-restricted-syntax
    for (const { name, value, secret } of parameters) {
      core.setOutput(name, value);
      core.exportVariable(name, value);
      if (secret === true) {
        core.setSecret(value);
      }
    }
  } catch (error) {
    setFailed(`Login failed: ${error.message}`);
  }
}

module.exports = run;
