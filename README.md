<h2 align="center">
    <a href="https://nullplatform.com" target="blank_">
        <img height="100" alt="nullplatform" src="https://nullplatform.com/favicon/android-chrome-192x192.png" />
    </a>
    <br>
    <br>
    Nullplatform Parameter GitHub Action
    <br>
</h2>

## Overview

The "Nullplatform Parameter" GitHub Action allows you to query and retrieve build parameters for a nullplatform application. It simplifies the process of fetching and using these parameters within your GitHub Actions workflows.

## Table of Contents

- [Inputs](#inputs)
- [Outputs](#outputs)
- [Usage](#usage)
- [License](#license)

## Inputs

### `application-id`

- **Description**: The application ID to query build parameters.
- **Required**: Yes

### `name`

- **Description**: The parameter name to query. (Optional)
- **Required**: No

## Outputs

This GitHub Action dynamically generates outputs based on the retrieved build parameters. Each build parameter will be available as an output and as a environment variable.

## Usage

Here's a common use case for this GitHub Action:

### Use Case: Query Build Parameters

```yaml
name: Query Nullplatform Build Parameters

on:
  push:
    branches:
      - main

jobs:
  query_parameters:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Query Nullplatform Build Parameters
        id: query-params
        uses: nullplatform/nullplatform-parameter-action@v1
        with:
          application-id: your-app-id

      - name: Display Application Parameters
        run: |
          echo "Retrieved Application Parameters:"
          echo "Parameter Value: ${{ steps.query-params.outputs.asset-s3-bucket }}"
```

In this example, the GitHub Action queries build parameters for a nullplatform application. You can customize it according to your workflow's requirements by specifying the `application-id` and optionally the name of the parameter you want to query.

## License

This GitHub Action is licensed under the [MIT License](LICENSE).
