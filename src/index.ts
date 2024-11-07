import {
  ActionEvent,
  BlockTriggerEvent,
  EthLog,
} from "@openzeppelin/defender-sdk-action-client";
import { utils, BigNumber, providers, Contract } from "ethers";

import axios from "axios";

export const sharedState: Record<"ClaimedEvent", ClaimedEventParams[]> = {
  ClaimedEvent: [],
};

// Constants for percentage and target decimals
const bufferAmountPercentage = 20n;
const alarmAmountPercentage = 10n;
const storageTotalAmountTargetDecimals = 6;

// Identifier for Claimed event
// = keccak256(abi.encodePacked("Claimed(bytes32,address,string,address,uint256,bytes)"))
const claimedId = utils.hexlify(
  "0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a"
);

type ClaimTokenFromStorage = {
  chainId: number;
  tokenSymbol: string;
  tokenAddress: string;
  totalAmount: number;
};

// Structure for Claimed event
export interface ClaimedEventParams {
  claimHash: string; // bytes32
  tokenAddress: string; // address
  eventID: string; // string
  userAddress: string; // address
  amount: BigNumber; // uint256
  signerSignature: string; // bytes
}

// Logs JSON data, converting BigNumber to string
const jsonStringify = (data: any): string => {
  return JSON.stringify(
    data,
    (_, value) => {
      return BigNumber.isBigNumber(value) ? `${value.toHexString()}` : value;
    },
    2
  );
};

// Prints JSON data to console with a title
export const printJson = (title: string, data: Object) => {
  console.log(`${title}: ${jsonStringify(data)}`);
};

// Parses and validates the ClaimToken list from JSON
const parseClaimTokenList = (
  claimTokenList: string
): ClaimTokenFromStorage[] => {
  try {
    // Parse JSON and convert specific fields
    const parsedData = JSON.parse(claimTokenList, (key, value) => {
      if (key === "totalAmount") {
        return Number(value);
      }
      if (key === "tokenAddress") {
        return utils.getAddress(value);
      }
      return value;
    });

    // Validate each item in the parsed data
    parsedData.forEach((item: any) => {
      if (
        typeof item.chainId !== "number" ||
        typeof item.tokenSymbol !== "string" ||
        typeof item.tokenAddress !== "string" ||
        typeof item.totalAmount !== "number"
      ) {
        throw new Error(`Invalid ClaimToken data: ${JSON.stringify(item)}`);
      }
    });

    // Return validated data
    return parsedData as ClaimTokenFromStorage[];
  } catch (error) {
    console.error(`Failed to parse claimTokenList: ${error}`);
    return [];
  }
};

// Decodes the Claimed event logs and filters based on token addresses
const parseClaimedEvent = (params: {
  logs: EthLog[];
  filterTokens?: string[];
}): ClaimedEventParams[] => {
  const eventLogs = params.logs.filter(
    (log) => utils.hexlify(log.topics[0]) === claimedId
  );

  // Log warning if no matching events are found
  if (eventLogs.length === 0) {
    console.warn(`Claimed event not found`);
    return [];
  }

  // Use reduce to accumulate valid events
  const decodedClaimedEvents = eventLogs.reduce<ClaimedEventParams[]>(
    (claimed, eventLog) => {
      const tokenAddress = utils.getAddress(
        utils.hexDataSlice(eventLog.topics[1], 12)
      );

      // Skip if the tokenAddress doesn't match the filter
      if (params.filterTokens && !params.filterTokens.includes(tokenAddress)) {
        return claimed;
      }

      const userAddress = utils.getAddress(
        utils.hexDataSlice(eventLog.topics[2], 12)
      );

      const amount = BigNumber.from(eventLog.topics[3]);

      const [claimHash, eventID, signerSignature] =
        utils.defaultAbiCoder.decode(
          ["bytes32", "string", "bytes"],
          eventLog.data
        );

      // Push valid event to result
      claimed.push({
        claimHash: utils.hexlify(claimHash),
        tokenAddress,
        eventID,
        userAddress,
        amount,
        signerSignature: utils.hexlify(signerSignature),
      });

      return claimed;
    },
    []
  );

  if (decodedClaimedEvents.length === 0) {
    console.warn(`No matching tokens found in Claimed events`);
  }

  return decodedClaimedEvents;
};

// Gets RPC URL based on chain ID and API key
const getRpcUrl = (chainId: number, alchemyApiKey: string): string | null => {
  const baseUrls: Record<number, string> = {
    1: `https://eth-mainnet.g.alchemy.com/v2/`,
    10: `https://opt-mainnet.g.alchemy.com/v2/`,
    42161: `https://arb-mainnet.g.alchemy.com/v2/`,
    11155111: `https://eth-sepolia.g.alchemy.com/v2/`,
    11155420: `https://opt-sepolia.g.alchemy.com/v2/`,
    421614: `https://arb-sepolia.g.alchemy.com/v2/`,
  };

  return baseUrls[chainId] ? `${baseUrls[chainId]}${alchemyApiKey}` : null;
};

// Gets network name based on chain ID
const getNetworkName = (chainId: number): string | null => {
  const baseNames: Record<number, string> = {
    1: `Mainnet`,
    10: `Optimism Mainnet`,
    42161: `Arbitrum One`,
    11155111: `Sepolia`,
    11155420: `Optimism Sepolia Testnet`,
    421614: `Arbitrum Sepolia`,
  };

  return baseNames[chainId] ? `${baseNames[chainId]}` : `Unknown`;
};

// Gets transaction scan URL for a given chain ID and transaction hash
const getTransactionLogScanUrl = (
  chainId: number,
  transactionHash: string
): string => {
  const baseUrls: Record<number, string> = {
    1: `https://etherscan.io/tx/`,
    10: `https://optimistic.etherscan.io/tx/`,
    42161: `https://arbiscan.io/tx/`,
    11155111: `https://sepolia.etherscan.io/tx/`,
    11155420: `https://sepolia-optimism.etherscan.io/tx/`,
    421614: `https://sepolia.arbiscan.io/tx/`,
  };

  return baseUrls[chainId]
    ? `${baseUrls[chainId]}${transactionHash}#eventlog`
    : `Unknown`;
};

// Gets scan URL to view token balances for a specific account
const getTokenScanUrl = (
  chainId: number,
  accountAddress: string,
  tokenAddress: string
): string => {
  const baseUrls: Record<number, string> = {
    1: `https://etherscan.io/token/`,
    10: `https://optimistic.etherscan.io/token/`,
    42161: `https://arbiscan.io/token/`,
    11155111: `https://sepolia.etherscan.io/token/`,
    11155420: `https://sepolia-optimism.etherscan.io/token/`,
    421614: `https://sepolia.arbiscan.io/token/`,
  };

  return baseUrls[chainId]
    ? `${baseUrls[chainId]}${tokenAddress}?a=${accountAddress}`
    : `Unknown`;
};

// Gets token balance and decimals using the Alchemy API
const getTokenBalance = async (
  chainId: number,
  tokenAddress: string,
  accountAddress: string,
  alchemyApiKey?: string
): Promise<{ balance: BigNumber; decimals: number }> => {
  if (!alchemyApiKey) {
    console.error(`Alchemy api key not found`);
    return { balance: BigNumber.from(0), decimals: -1 };
  }

  const rpcUrl = getRpcUrl(chainId, alchemyApiKey);

  if (!rpcUrl) {
    console.error(`Can not get balance: chainId not found`);
    return { balance: BigNumber.from(0), decimals: -1 };
  }

  const provider = new providers.JsonRpcProvider(rpcUrl);

  const erc20Contract = new Contract(
    tokenAddress,
    [
      "function balanceOf(address account) external view returns (uint256)",
      "function decimals() public view returns (uint8)",
    ],
    // new JsonRpcProvider(rpcUrl)
    provider
  );

  try {
    const balance = BigNumber.from(
      await erc20Contract.balanceOf(accountAddress)
    );
    const decimals = BigNumber.from(await erc20Contract.decimals()).toNumber();

    return {
      balance,
      decimals,
    };
  } catch (error) {
    console.error(`Failed to get token balance: ${error}`);
    return { balance: BigNumber.from(0), decimals: -1 };
  }
};

// Formats the token balance with decimal precision
const formatTokenBalance = (balance: bigint, decimals: number): string => {
  const integerPart = balance / 10n ** BigInt(decimals);
  const decimalPart = balance % 10n ** BigInt(decimals);

  const formattedBalance = `${integerPart}.${decimalPart
    .toString()
    .padStart(Number(decimals), "0")}`;

  return formattedBalance;
};

// Sends notifications to Discord webhook
const notifyDiscord = async (
  text: string,
  content: string,
  webhookLink?: string
) => {
  if (!webhookLink) {
    console.error(`Discord webhook link not found`);
    return;
  }

  const discordText = `🐥 ${text}:\n${content}`;

  const data = {
    content: `${discordText}`,
  };

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  console.log(`Sending to Discord: ${discordText}`);

  try {
    // Send message to Discord
    const response = await axios.post(webhookLink, data, config);

    // Throw error if response status is not 204
    if (response.status !== 204) {
      throw new Error(
        `Failed to send Discord notification: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error sending Discord notification: ${error}`);
  }
};

// Sends notifications to Slack webhook
const notifySlack = async (
  text: string,
  content: string,
  webhookLink?: string
) => {
  if (!webhookLink) {
    console.error(`Slack webhook link not found`);
    return;
  }

  const slackText = `🐥 ${text}:\n${content}`;

  const payload = {
    username: "webhookbot",
    text: slackText,
    icon_emoji: ":money:",
  };

  console.log(`Sending to Slack: ${slackText}`);

  try {
    // Send message to Slack
    const response = await axios.post(webhookLink, payload);

    // Throw error if response status is not 204
    if (response.status !== 200) {
      throw new Error(
        `Failed to send Slack notification: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error sending Slack notification: ${error}`);
  }
};

// Append a value to a JSON array in sharedState
const pushToSharedState = async (params: {
  key: "ClaimedEvent";
  value: ClaimedEventParams;
}) => {
  sharedState[params.key] = sharedState[params.key] || [];
  sharedState[params.key].push(JSON.parse(JSON.stringify(params.value)));
};

// Entrypoint for the Autotask
export async function handler(actionEvent: ActionEvent) {
  if (
    !actionEvent.request?.body ||
    !("transaction" in actionEvent.request.body) ||
    !("logs" in (actionEvent.request.body as BlockTriggerEvent).transaction)
  ) {
    console.error("Logs are not found in the transaction.");
    return;
  }
  //   printJson("actionEvent", actionEvent);

  const requestBody = actionEvent.request.body as BlockTriggerEvent;
  //   printJson("requestBody", requestBody);

  const logs = requestBody.transaction.logs;
  //   printJson("logs", logs);

  const claimTokenList: ClaimTokenFromStorage[] = [];

  if (actionEvent.secrets?.CLAIM_TOKEN_LIST) {
    claimTokenList.push(
      ...parseClaimTokenList(actionEvent.secrets?.CLAIM_TOKEN_LIST)
    );
  }

  if (claimTokenList.length === 0) {
    console.error(`Claim token list not found`);
    return;
  }

  //   printJson("claimTokenList", claimTokenList);

  // Configure secret: https://defender.openzeppelin.com/#/settings/secrets
  // Example: DISCORD_CLAIMTOKEN_CHANNEL_WEBHOOK=https://discord.com/api/webhooks/xxx/xxx
  // Example: SLACK_CLAIMTOKEN_CHANNEL_WEBHOOK=https://hooks.slack.com/services/xxx/xxx/xxx
  const discordWebhookLink =
    actionEvent.secrets?.DISCORD_CLAIMTOKEN_CHANNEL_WEBHOOK;
  console.log(`discordWebhookLink: ${discordWebhookLink}`);

  const slackWebhookLink =
    actionEvent.secrets?.SLACK_CLAIMTOKEN_CHANNEL_WEBHOOK;
  console.log(`slackWebhookLink: ${slackWebhookLink}`);

  const alchemyApiKey = actionEvent.secrets?.ALCHEMY_API_KEY;
  console.log(`alchemyApiKey: ${alchemyApiKey}`);

  const blockTriggerEvent: BlockTriggerEvent = actionEvent.request
    .body as BlockTriggerEvent;

  const chainId = blockTriggerEvent.monitor.chainId;
  const claimTokenAddress = utils.getAddress(blockTriggerEvent.transaction.to);
  //   const logs = transactionEvent.logs as Log[];

  // Filter tokens by target chain ID
  const filteredClaimTokenListFromStorage = claimTokenList.filter(
    (token) => token.chainId === chainId
  );

  const tokenAddressesFromStorage = filteredClaimTokenListFromStorage.map(
    (token) => token.tokenAddress
  );

  printJson("tokenAddressesFromStorage", tokenAddressesFromStorage);

  // Fetch Claimed logs if tokenAddress is in target tokens
  const claimedLogs = parseClaimedEvent({
    logs,
    filterTokens: tokenAddressesFromStorage,
  });

  printJson("claimedLogs", claimedLogs);

  // Process each user operation processed log
  for (const claimedLog of claimedLogs) {
    const token = filteredClaimTokenListFromStorage.find(
      (token) => token.tokenAddress === claimedLog.tokenAddress
    );

    if (!token) {
      continue;
    }

    pushToSharedState({
      key: "ClaimedEvent",
      value: claimedLog,
    });

    const totalAmount = token.totalAmount;
    const tokenSymbol = token.tokenSymbol;

    const tokenOfClaimTokenContract = await getTokenBalance(
      chainId,
      claimedLog.tokenAddress,
      claimTokenAddress,
      alchemyApiKey
    );

    const transactionScanUrl = getTransactionLogScanUrl(
      chainId,
      blockTriggerEvent.hash
    );

    const tokenAddressScanUrl = getTokenScanUrl(
      chainId,
      claimTokenAddress,
      claimedLog.tokenAddress
    );

    const networkName = getNetworkName(chainId);

    if (tokenOfClaimTokenContract.decimals === -1) {
      const text = `(OpenZeppelin Defender Actions) Rpc error: unable to retrieve ClaimToken contract's ${tokenSymbol} balance on ${networkName}, triggered by Claimed event in tx: ${transactionScanUrl} .`;

      console.error(`text: ${text}`);

      // Notify Discord
      await notifyDiscord(text, jsonStringify(claimedLog), discordWebhookLink);

      // Notify Slack
      await notifySlack(text, jsonStringify(claimedLog), slackWebhookLink);
      continue;
    }

    console.log(`decimals:\t${tokenOfClaimTokenContract.decimals}`);
    console.log(`balance:\t${tokenOfClaimTokenContract.balance}`);

    const alarmAmount =
      (BigInt(
        Math.floor(totalAmount * 10 ** storageTotalAmountTargetDecimals)
      ) *
        bufferAmountPercentage *
        alarmAmountPercentage *
        10n ** BigInt(tokenOfClaimTokenContract.decimals)) /
      10n ** BigInt(storageTotalAmountTargetDecimals) /
      10n ** 4n;

    console.log(`alarmAmount:\t${alarmAmount}`);

    const formattedBalance = formatTokenBalance(
      tokenOfClaimTokenContract.balance.toBigInt(),
      tokenOfClaimTokenContract.decimals
    );

    const formattedAlarmAmount = formatTokenBalance(
      alarmAmount,
      tokenOfClaimTokenContract.decimals
    );

    if (alarmAmount >= tokenOfClaimTokenContract.balance.toBigInt()) {
      const text = `(OpenZeppelin Defender Actions) ClaimToken contract's ${tokenSymbol} (${tokenAddressScanUrl} ) balance (${formattedBalance}) on ${networkName} fell below threshold (${formattedAlarmAmount}), triggered by Claimed event in tx: ${transactionScanUrl} .`;

      console.warn(`text: ${text}`);

      // Notify Discord
      await notifyDiscord(text, jsonStringify(claimedLog), discordWebhookLink);

      // Notify Slack
      await notifySlack(text, jsonStringify(claimedLog), slackWebhookLink);
      return;
    }
    console.log(
      `ClaimToken contract's ${tokenSymbol} (${tokenAddressScanUrl} ) balance (${formattedBalance}) on ${networkName} exceeds threshold (${formattedAlarmAmount}), so it's sufficient.`
    );
  }

  console.log(`Tenderly Web3 Action script completed`);
}
