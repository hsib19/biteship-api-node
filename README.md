# Biteship API Node

An unofficial Node.js SDK for integrating with the Biteship API.

---

## Installation

```bash
npm install biteship-api-node
```

or

```bash
yarn add biteship-api-node
```

---

## Requirements

- Node.js \>= 18

---

## Quick Start

### ESM

```ts
import { Biteship } from 'biteship-api-node';

const client = new Biteship({
  apiKey: 'YOUR_API_KEY',
});
```

### CommonJS

```js
const { Biteship } = require('biteship-api-node');

const client = new Biteship({
  apiKey: 'YOUR_API_KEY',
});
```

---

## Example: Get Courier Rates

```ts
const rates = await client.rates.getRatesByCoordinates({
  origin_latitude: -6.2,
  origin_longitude: 106.816666,
  destination_latitude: -6.914744,
  destination_longitude: 107.60981,
  couriers: 'jne,sicepat,anteraja',
  items: [
    {
      name: 'Product A',
      description: 'Sample product',
      value: 100000,
      weight: 1000,
      quantity: 1,
    },
  ],
});

console.log(rates);
```

---

## Available Modules

### Couriers

- `getCouriers()`

### Draft Orders

- `createDraftOrder()`
- `retrieveDraftOrder()`
- `retrieveDraftOrderRates()`
- `updateDraftOrder()`
- `deleteDraftOrder()`
- `confirmDraftOrder()`

### Locations

- `createLocation()`
- `getLocationById()`
- `updateLocation()`
- `deleteLocation()`

### Maps

- `searchArea()`

### Orders

- `createStandardOrder()`
- `createInstantOrder()`
- `createCashOnDeliveryOrder()`
- `createDropOffOrder()`
- `retrieveOrder()`
- `cancelOrder()`
- `getCancellationReasons()`

### Rates

- `getRatesByCoordinates()`
- `getRatesByPostalCode()`
- `getRatesByAreaId()`
- `getRatesByMix()`
- `getRatesByType()`
- `getRatesWithInsurance()`
- `getRatesWithCOD()`

### Tracking

- `tTrackingById()`
- `tPublicTracking()`

---

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run build:watch
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Test

```bash
npm run test
```

### Coverage

```bash
npm run test:cov
```

---

## Authentication

You need a Biteship API key to use this SDK.

```ts
new Biteship({
  apiKey: process.env.BITESHIP_API_KEY!,
});
```
