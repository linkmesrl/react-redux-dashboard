# React Redux Dashboard
A json-configurable dashboard bootstrapped with `create-react-app` made with `react`, `redux`, `redux-saga` and `react-google-charts`

![Screenshot](/src/assets/screenshot.png?raw=true)

## Table of Contents
- [Installation](#installation)
- [Run](#run)
- [Usage](#usage)
  - [Add an Endpoint](#add-an-endpoint)
  - [Dashboard configuration](#dashboard-configuration)
    - [Plugin options](#plugin-options)
     - [General](#general)
     - [Plugin specific](#plugin-specific)
      - [Info](#info-plugin)
      - [ColumnChart](#columnchart)
      - [PieChart](#piechart)
      - [LineChart](#linechart)
      - [TableChart](#tablechart)
  - [Define a plugin](#define-a-plugin)

## Installation
First install the dependencies:
```
npm install
```

Then you need to have a server running to load data inside plugins. You can install `json-server`, a JSON configurable server:

```
npm install -g json-server
```

and then run:

```
json-server --watch server.json --port 3001
```
to start the server, using the configuration inside `server.json` file.

## Run
By default the app is listening on `localhost:3001`. Run the app:
```
npm start
```

## Usage

### Add an Endpoint
To add an endpoint edit `src/util/endpoints.json` with:

```json
  {
    "ENDPOINT_NAME": {
      "url": "ENDPOINT_URL"
    }
  }
```

### Dashboard configuration
The `Demo` dashboard is pre-configured. You can add/remove rendered plugins by editing `src/util/dashboards.json`.

A plugin has this configuration:

```json
{
  "title": "TITLE",
  "name": "TYPE",
  "endpoints": [
    {
      "url": "ENDPOINT_NAME",
      "mapping": {
        "keys": {
          "label": "LABEL_KEY",
          "value": {
            "name": "VALUE_KEY"
          }
        }
      }
    }
  ],
  "layout": {
    "x": "X_POSITION",
    "y": "Y_POSITION",
    "w": "WIDTH",
    "h": "HEIGHT",
    "minW": "MIN_WIDTH",
    "maxW": "MAX_WIDTH",
    "minH": "MIN_HEIGHT",
    "maxH": "MAX_HEIGHT"
  }
}
```

#### Plugin options

##### General

`TITLE`: Title of the plugin in the Dashboard

`TYPE`: Plugin type (e.g. `PieChart`, `ColumnChart`, `LineChart`, `Info`, `TableChart`)

`ENDPOINT_NAME`: Endpoint name in `src/util/endpoints.json`

`LABEL_KEY`: Key in the object response used as single point/element label in a graph (e.g. `name`)

`VALUE_KEY`: Key in the object response used as single point/element value in a graph (e.g. `count`)

##### Plugin Specific

###### Info Plugin
`VALUE_TYPE`: Type of the value in the response (e.g. `string` [default], `number`, `double`, `date`, `timeAgo`)

```json
{
  "endpoints": [
    {
      "mapping": {
        "keys": {
          "value": {
            "type": "VALUE_TYPE"
          }
        }
      }
    }
  ]
}
```

###### ColumnChart
`VALUE_LABEL_KEY`: Columns section label (e.g. `Snacks` or `Candies`)

```json
{
  "endpoints": [
    {
      "mapping": {
        "keys": {
          "value": {
            "label": "VALUE_LABEL_KEY"
          }
        }
      }
    }
  ]
}
```

###### PieChart
See general configuration

###### LineChart
`1ST_STATUS", 2ND_STATUS`: Label for different types of data in a LineChart (e.g.`view` or `purchase`)

`1ST_COLOR, 2ND_COLOR`: Colors for different types of data in a LineChart (e.g.`green` or `#b4da55`)

`1ST_LABEL, 2ND_LABEL, 3RD_LABEL`: Labels for LineChart lines (e.g. [`Time`, `Views`, `Purchases`])

```json
{
  "endpoints": [
    {
      "mapping": {
        "statuses": ["1ST_STATUS", "2ND_STATUS"],
        "colors": ["1ST_COLOR", "2ND_COLOR"],
        "labels": ["1ST_LABEL", "2ND_LABEL", "3RD_LABEL"]
      }
    }
  ]
}
```

###### TableChart
`TABLE_ROW_LABEL`: Table row label (e.g. `Date`)

`TABLE_ROW_KEY`: Table row key in the response (e.g. `timestamp`)

`TABLE_ROW_TYPE`: Table row type (e.g. `date`) [optional]

`TABLE_ROW_FORMAT`: Table row format (e.g. `YYYY/MM/DD hh:mm`) [optional]

```json
{
  "endpoints": [
    {
      "columns": [
        {
          "label": "TABLE_ROW_LABEL",
          "value": "TABLE_ROW_KEY",
          "mapping": {
            "type": "TABLE_ROW_TYPE",
            "format": "TABLE_ROW_FORMAT"
          }
        }
      ]
    }
  ]
}
```

##### Layout
The dashboard is a 2-column grid which contains plugins with different size and position. It is divided like this:

```
+---------------------------------+
|    x: 0, y: 0  |  x: 1, y: 0    |
+---------------------------------+
|    x: 0, y: 1  |  x: 1, y: 1    |
+---------------------------------+
|    x: 0, y: 2  |  x: 1, y: 2    |
+---------------------------------+
|               ...               |
```

`X_POSITION`: X coordinate position of the plugin in the dashboard

`Y_POSITION`: Y coordinate position of the plugin in the dashboard

`WIDTH`: Width of the plugin (`1` for half / `2` for the whole line)

`HEIGHT`: height of the plugin (`1` for `Info` / `2` for others)

`MIN_WIDTH`: Minimum width of the plugin (`1` for half / `2` for the whole line)

`MAX_WIDTH`: Maximum width of the plugin (`1` for half / `2` for the whole line)

`MIN_HEIGHT`: Minimum height of the plugin (`1` for `Info` / `2` for others)

`MAX_HEIGHT`: Maximum height of the plugin (`1` for `Info` / `2` for others)


### Define a Plugin

To add a plugin edit `src/util/plugins.json`. For the configuration see `Dashboard configuration`.

It is not necessary to add in the `Layout` part the `X_POSITION` and `Y_POSITION` keys.
