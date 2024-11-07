# ClaimToken-OpenZeppelin-Action

OpenZeppelin action for ClaimToken contract

## Prerequisites

1. Create an Actions project on [OpenZeppelin Defender](https://defender.openzeppelin.com/#/actions/automatic).

2. Get the Actions ID from the URL on the Actions page.

3. Use a Discord webhook to manage ClaimToken messages. Get the WebHook URL from the specified Discord channel.

4. In OpenZeppelin’s Secrets, add "DISCORD_CLAIMTOKEN_CHANNEL_WEBHOOK" and set the webhook URL.

5. Similarly, create a Slack webhook at [https://my.slack.com/services/new/incoming-webhook](https://my.slack.com/services/new/incoming-webhook) and store its URL in the `SLACK_CLAIMTOKEN_CHANNEL_WEBHOOK` variable within OpenZeppelin Defender Secrets.

6. Create a Alchemy API key at [https://dashboard.alchemy.com/apps](https://dashboard.alchemy.com/apps) and store its key in the `ALCHEMY_API_KEY` variable within OpenZeppelin Defender Secrets.

7. Add "CLAIM_TOKEN_LIST" as a string array, e.g., `

```
[{"chainId":10,"tokenSymbol":"UNI","tokenAddress":"0x6fd9d7AD17242c41f7131d257212c54A0e816691","totalAmount":1000000.123456789},{"chainId":10,"tokenSymbol":"USDT","tokenAddress":"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"USDT","tokenAddress":"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"DAI","tokenAddress":"0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"LON","tokenAddress":"0x55678cd083fcDC2947a0Df635c93C838C89454A3","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"WBTC","tokenAddress":"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"USDC","tokenAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"WETH","tokenAddress":"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1","totalAmount":1000000.1234567},{"chainId":11155111,"tokenSymbol":"DAI","tokenAddress":"0xC8c4EFA54D6774F55DD09134a901865ff286321e","totalAmount":23332.4},{"chainId":11155111,"tokenSymbol":"LON","tokenAddress":"0x6C1851b852F05bdc7c0BE1A088532E4999fD94Fa","totalAmount":483183.4},{"chainId":11155111,"tokenSymbol":"USDC","tokenAddress":"0xa07DD8cb5A5c4254B5da0456AFD597A60a92b633","totalAmount":1000000.1234567},{"chainId":11155111,"tokenSymbol":"USDT","tokenAddress":"0x63b26b83c6f38433B2b6a7214fC2c569a4F4069A","totalAmount":492835.123456789},{"chainId":11155111,"tokenSymbol":"WBTC","tokenAddress":"0x7fA5E99D78FB17379C467B3dC5D0F63AcED6a80D","totalAmount":468.123456789},{"chainId":11155111,"tokenSymbol":"WETH","tokenAddress":"0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14","totalAmount":1000000.1234567},{"chainId":11155420,"tokenSymbol":"USDC","tokenAddress":"0x5fd84259d66Cd46123540766Be93DFE6D43130D7","totalAmount":1000000.1234567},{"chainId":421614,"tokenSymbol":"USDC","tokenAddress":"0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d","totalAmount":1000000.1234567}]
```

8. Install OpenZeppelin Defender SDK Action Client CLI on local

```bash
$ npm install --global @openzeppelin/defender-sdk-action-client
```

## 2. Build the Local Project

### (1) Prepare the Project

First, clone the repository and navigate into the project directory:

```bash
$ git clone https://github.com/oneleo/ClaimToken-OpenZeppelin-Action.git
$ cd ClaimToken-OpenZeppelin-Action/
$ npm install
```

### (2) Compile the Script

Next, compile the TypeScript code to JavaScript:

```
$ npm run build
```

## 3. Deploy the Script to OpenZeppelin Actions

### (1) Set Deployment Environment Variables

Before deploying, set the following environment variables:

1. Generate an API Key

Create an API key on the OpenZeppelin Defender website:

[OpenZeppelin Defender API Keys](https://defender.openzeppelin.com/#/settings/api-keys)

2. Set Environment Variables

Use the following commands to export your API key and secret:

```bash
$ export API_KEY="<YOUR_OPENZDPPELIN_API_KEY>" \
&& export API_SECRET="<YOUR_OPENZDPPELIN_API_SECRET>"
```

3. Set the Action ID

```bash
$ export ACTION_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### (2) Deploy the OpenZeppelin Actions Script

Finally, deploy your script using the following command:

```bash
$ defender-action update-code ${ACTION_ID} dist/
```
