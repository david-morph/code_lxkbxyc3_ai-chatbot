"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUIStateFromAIState = exports.AI = void 0;
require("server-only");
const rsc_1 = require("ai/rsc");
const openai_1 = require("@ai-sdk/openai");
const stocks_1 = require("@/components/stocks");
const zod_1 = require("zod");
const events_skeleton_1 = require("@/components/stocks/events-skeleton");
const events_1 = require("@/components/stocks/events");
const stocks_skeleton_1 = require("@/components/stocks/stocks-skeleton");
const stocks_2 = require("@/components/stocks/stocks");
const stock_skeleton_1 = require("@/components/stocks/stock-skeleton");
const utils_1 = require("@/lib/utils");
const actions_1 = require("@/app/actions");
const message_1 = require("@/components/stocks/message");
const auth_1 = require("@/auth");
async function confirmPurchase(symbol, price, amount) {
    'use server';
    const aiState = (0, rsc_1.getMutableAIState)();
    const purchasing = (0, rsc_1.createStreamableUI)(<div className="inline-flex items-start gap-1 md:items-center">
      {stocks_1.spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>);
    const systemMessage = (0, rsc_1.createStreamableUI)(null);
    (0, utils_1.runAsyncFnWithoutBlocking)(async () => {
        await (0, utils_1.sleep)(1000);
        purchasing.update(<div className="inline-flex items-start gap-1 md:items-center">
        {stocks_1.spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>);
        await (0, utils_1.sleep)(1000);
        purchasing.done(<div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {(0, utils_1.formatNumber)(amount * price)}
        </p>
      </div>);
        systemMessage.done(<stocks_1.SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {(0, utils_1.formatNumber)(amount * price)}.
      </stocks_1.SystemMessage>);
        aiState.done({
            ...aiState.get(),
            messages: [
                ...aiState.get().messages,
                {
                    id: (0, utils_1.nanoid)(),
                    role: 'system',
                    content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${amount * price}]`
                }
            ]
        });
    });
    return {
        purchasingUI: purchasing.value,
        newMessage: {
            id: (0, utils_1.nanoid)(),
            display: systemMessage.value
        }
    };
}
async function submitUserMessage(content) {
    'use server';
    const aiState = (0, rsc_1.getMutableAIState)();
    aiState.update({
        ...aiState.get(),
        messages: [
            ...aiState.get().messages,
            {
                id: (0, utils_1.nanoid)(),
                role: 'user',
                content
            }
        ]
    });
    let textStream;
    let textNode;
    const result = await (0, rsc_1.streamUI)({
        model: (0, openai_1.openai)('gpt-3.5-turbo'),
        initial: <message_1.SpinnerMessage />,
        system: `\
    You are a stock trading conversation bot and you can help users buy stocks, step by step.
    You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.

    Messages inside [] means that it's a UI element or a user event. For example:
    - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
    - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

    If the user requests purchasing a stock, call \`show_stock_purchase_ui\` to show the purchase UI.
    If the user just wants the price, call \`show_stock_price\` to show the price.
    If you want to show trending stocks, call \`list_stocks\`.
    If you want to show events, call \`get_events\`.
    If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.

    Besides that, you can also chat with users and do some calculations if needed.`,
        messages: [
            ...aiState.get().messages.map((message) => ({
                role: message.role,
                content: message.content,
                name: message.name
            }))
        ],
        text: ({ content, done, delta }) => {
            if (!textStream) {
                textStream = (0, rsc_1.createStreamableValue)('');
                textNode = <stocks_1.BotMessage content={textStream.value}/>;
            }
            if (done) {
                textStream.done();
                aiState.done({
                    ...aiState.get(),
                    messages: [
                        ...aiState.get().messages,
                        {
                            id: (0, utils_1.nanoid)(),
                            role: 'assistant',
                            content
                        }
                    ]
                });
            }
            else {
                textStream.update(delta);
            }
            return textNode;
        },
        tools: {
            listStocks: {
                description: 'List three imaginary stocks that are trending.',
                parameters: zod_1.z.object({
                    stocks: zod_1.z.array(zod_1.z.object({
                        symbol: zod_1.z.string().describe('The symbol of the stock'),
                        price: zod_1.z.number().describe('The price of the stock'),
                        delta: zod_1.z.number().describe('The change in price of the stock')
                    }))
                }),
                generate: async function* ({ stocks }) {
                    yield (<stocks_1.BotCard>
              <stocks_skeleton_1.StocksSkeleton />
            </stocks_1.BotCard>);
                    await (0, utils_1.sleep)(1000);
                    const toolCallId = (0, utils_1.nanoid)();
                    aiState.done({
                        ...aiState.get(),
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: (0, utils_1.nanoid)(),
                                role: 'assistant',
                                content: [
                                    {
                                        type: 'tool-call',
                                        toolName: 'listStocks',
                                        toolCallId,
                                        args: { stocks }
                                    }
                                ]
                            },
                            {
                                id: (0, utils_1.nanoid)(),
                                role: 'tool',
                                content: [
                                    {
                                        type: 'tool-result',
                                        toolName: 'listStocks',
                                        toolCallId,
                                        result: stocks
                                    }
                                ]
                            }
                        ]
                    });
                    return (<stocks_1.BotCard>
              <stocks_2.Stocks props={stocks}/>
            </stocks_1.BotCard>);
                }
            },
            showStockPrice: {
                description: 'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
                parameters: zod_1.z.object({
                    symbol: zod_1.z
                        .string()
                        .describe('The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'),
                    price: zod_1.z.number().describe('The price of the stock.'),
                    delta: zod_1.z.number().describe('The change in price of the stock')
                }),
                generate: async function* ({ symbol, price, delta }) {
                    yield (<stocks_1.BotCard>
              <stock_skeleton_1.StockSkeleton />
            </stocks_1.BotCard>);
                    await (0, utils_1.sleep)(1000);
                    const toolCallId = (0, utils_1.nanoid)();
                    aiState.done({
                        ...aiState.get(),
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: (0, utils_1.nanoid)(),
                                role: 'assistant',
                                content: [
                                    {
                                        type: 'tool-call',
                                        toolName: 'showStockPrice',
                                        toolCallId,
                                        args: { symbol, price, delta }
                                    }
                                ]
                            },
                            {
                                id: (0, utils_1.nanoid)(),
                                role: 'tool',
                                content: [
                                    {
                                        type: 'tool-result',
                                        toolName: 'showStockPrice',
                                        toolCallId,
                                        result: { symbol, price, delta }
                                    }
                                ]
                            }
                        ]
                    });
                    return (<stocks_1.BotCard>
              <stocks_1.Stock props={{ symbol, price, delta }}/>
            </stocks_1.BotCard>);
                }
            },
            showStockPurchase: {
                description: 'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
                parameters: zod_1.z.object({
                    symbol: zod_1.z
                        .string()
                        .describe('The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'),
                    price: zod_1.z.number().describe('The price of the stock.'),
                    numberOfShares: zod_1.z
                        .number()
                        .optional()
                        .describe('The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.')
                }),
                generate: async function* ({ symbol, price, numberOfShares = 100 }) {
                    const toolCallId = (0, utils_1.nanoid)();
                    if (numberOfShares <= 0 || numberOfShares > 1000) {
                        aiState.done({
                            ...aiState.get(),
                            messages: [
                                ...aiState.get().messages,
                                {
                                    id: (0, utils_1.nanoid)(),
                                    role: 'assistant',
                                    content: [
                                        {
                                            type: 'tool-call',
                                            toolName: 'showStockPurchase',
                                            toolCallId,
                                            args: { symbol, price, numberOfShares }
                                        }
                                    ]
                                },
                                {
                                    id: (0, utils_1.nanoid)(),
                                    role: 'tool',
                                    content: [
                                        {
                                            type: 'tool-result',
                                            toolName: 'showStockPurchase',
                                            toolCallId,
                                            result: {
                                                symbol,
                                                price,
                                                numberOfShares,
                                                status: 'expired'
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: (0, utils_1.nanoid)(),
                                    role: 'system',
                                    content: `[User has selected an invalid amount]`
                                }
                            ]
                        });
                        return <stocks_1.BotMessage content={'Invalid amount'}/>;
                    }
                    else {
                        aiState.done({
                            ...aiState.get(),
                            messages: [
                                ...aiState.get().messages,
                                {
                                    id: (0, utils_1.nanoid)(),
                                    role: 'assistant',
                                    content: [
                                        {
                                            type: 'tool-call',
                                            toolName: 'showStockPurchase',
                                            toolCallId,
                                            args: { symbol, price, numberOfShares }
                                        }
                                    ]
                                },
                                {
                                    id: (0, utils_1.nanoid)(),
                                    role: 'tool',
                                    content: [
                                        {
                                            type: 'tool-result',
                                            toolName: 'showStockPurchase',
                                            toolCallId,
                                            result: {
                                                symbol,
                                                price,
                                                numberOfShares
                                            }
                                        }
                                    ]
                                }
                            ]
                        });
                        return (<stocks_1.BotCard>
                <stocks_1.Purchase props={{
                                numberOfShares,
                                symbol,
                                price: +price,
                                status: 'requires_action'
                            }}/>
              </stocks_1.BotCard>);
                    }
                }
            },
            getEvents: {
                description: 'List funny imaginary events between user highlighted dates that describe stock activity.',
                parameters: zod_1.z.object({
                    events: zod_1.z.array(zod_1.z.object({
                        date: zod_1.z
                            .string()
                            .describe('The date of the event, in ISO-8601 format'),
                        headline: zod_1.z.string().describe('The headline of the event'),
                        description: zod_1.z.string().describe('The description of the event')
                    }))
                }),
                generate: async function* ({ events }) {
                    yield (<stocks_1.BotCard>
              <events_skeleton_1.EventsSkeleton />
            </stocks_1.BotCard>);
                    await (0, utils_1.sleep)(1000);
                    const toolCallId = (0, utils_1.nanoid)();
                    aiState.done({
                        ...aiState.get(),
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: (0, utils_1.nanoid)(),
                                role: 'assistant',
                                content: [
                                    {
                                        type: 'tool-call',
                                        toolName: 'getEvents',
                                        toolCallId,
                                        args: { events }
                                    }
                                ]
                            },
                            {
                                id: (0, utils_1.nanoid)(),
                                role: 'tool',
                                content: [
                                    {
                                        type: 'tool-result',
                                        toolName: 'getEvents',
                                        toolCallId,
                                        result: events
                                    }
                                ]
                            }
                        ]
                    });
                    return (<stocks_1.BotCard>
              <events_1.Events props={events}/>
            </stocks_1.BotCard>);
                }
            }
        }
    });
    return {
        id: (0, utils_1.nanoid)(),
        display: result.value
    };
}
exports.AI = (0, rsc_1.createAI)({
    actions: {
        submitUserMessage,
        confirmPurchase
    },
    initialUIState: [],
    initialAIState: { chatId: (0, utils_1.nanoid)(), messages: [] },
    onGetUIState: async () => {
        'use server';
        const session = await (0, auth_1.auth)();
        if (session && session.user) {
            const aiState = (0, rsc_1.getAIState)();
            if (aiState) {
                const uiState = (0, exports.getUIStateFromAIState)(aiState);
                return uiState;
            }
        }
        else {
            return;
        }
    },
    onSetAIState: async ({ state, done }) => {
        'use server';
        if (!done)
            return;
        const session = await (0, auth_1.auth)();
        if (!session || !session.user)
            return;
        const { chatId, messages } = state;
        const createdAt = new Date();
        const userId = session.user.id;
        const path = `/chat/${chatId}`;
        const firstMessageContent = messages[0].content;
        const title = firstMessageContent.substring(0, 100);
        const chat = {
            id: chatId,
            title,
            userId,
            createdAt,
            messages,
            path
        };
        await (0, actions_1.saveChat)(chat);
    }
});
const getUIStateFromAIState = (aiState) => {
    return aiState.messages
        .filter(message => message.role !== 'system')
        .map((message, index) => ({
        id: `${aiState.chatId}-${index}`,
        display: message.role === 'tool' ? (message.content.map(tool => {
            return tool.toolName === 'listStocks' ? (<stocks_1.BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <stocks_2.Stocks props={tool.result}/>
              </stocks_1.BotCard>) : tool.toolName === 'showStockPrice' ? (<stocks_1.BotCard>
                {/* @ts-expect-error */}
                <stocks_1.Stock props={tool.result}/>
              </stocks_1.BotCard>) : tool.toolName === 'showStockPurchase' ? (<stocks_1.BotCard>
                {/* @ts-expect-error */}
                <stocks_1.Purchase props={tool.result}/>
              </stocks_1.BotCard>) : tool.toolName === 'getEvents' ? (<stocks_1.BotCard>
                {/* @ts-expect-error */}
                <events_1.Events props={tool.result}/>
              </stocks_1.BotCard>) : null;
        })) : message.role === 'user' ? (<message_1.UserMessage>{message.content}</message_1.UserMessage>) : message.role === 'assistant' &&
            typeof message.content === 'string' ? (<stocks_1.BotMessage content={message.content}/>) : null
    }));
};
exports.getUIStateFromAIState = getUIStateFromAIState;
//# sourceMappingURL=actions.js.map