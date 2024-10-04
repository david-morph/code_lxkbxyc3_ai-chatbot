'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = Purchase;
const react_1 = require("react");
const rsc_1 = require("ai/rsc");
const utils_1 = require("@/lib/utils");
function Purchase({ props: { numberOfShares, symbol, price, status = 'expired' } }) {
    const [value, setValue] = (0, react_1.useState)(numberOfShares || 100);
    const [purchasingUI, setPurchasingUI] = (0, react_1.useState)(null);
    const [aiState, setAIState] = (0, rsc_1.useAIState)();
    const [, setMessages] = (0, rsc_1.useUIState)();
    const { confirmPurchase } = (0, rsc_1.useActions)();
    // Unique identifier for this UI component.
    const id = (0, react_1.useId)();
    // Whenever the slider changes, we need to update the local value state and the history
    // so LLM also knows what's going on.
    function onSliderChange(e) {
        const newValue = Number(e.target.value);
        setValue(newValue);
        // Insert a hidden history info to the list.
        const message = {
            role: 'system',
            content: `[User has changed to purchase ${newValue} shares of ${name}. Total cost: $${(newValue * price).toFixed(2)}]`,
            // Identifier of this UI component, so we don't insert it many times.
            id
        };
        // If last history state is already this info, update it. This is to avoid
        // adding every slider change to the history.
        if (aiState.messages[aiState.messages.length - 1]?.id === id) {
            setAIState({
                ...aiState,
                messages: [...aiState.messages.slice(0, -1), message]
            });
            return;
        }
        // If it doesn't exist, append it to history.
        setAIState({ ...aiState, messages: [...aiState.messages, message] });
    }
    return (<div className="p-4 text-green-400 border rounded-xl bg-zinc-950">
      <div className="inline-block float-right px-2 py-1 text-xs rounded-full bg-white/10">
        +1.23% ↑
      </div>
      <div className="text-lg text-zinc-300">{symbol}</div>
      <div className="text-3xl font-bold">${price}</div>
      {purchasingUI ? (<div className="mt-4 text-zinc-200">{purchasingUI}</div>) : status === 'requires_action' ? (<>
          <div className="relative pb-6 mt-6">
            <p>Shares to purchase</p>
            <input id="labels-range-input" type="range" value={value} onChange={onSliderChange} min="10" max="1000" className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-zinc-600 accent-green-500 dark:bg-zinc-700"/>
            <span className="absolute text-xs bottom-1 start-0 text-zinc-400">
              10
            </span>
            <span className="absolute text-xs -translate-x-1/2 bottom-1 start-1/3 text-zinc-400 rtl:translate-x-1/2">
              100
            </span>
            <span className="absolute text-xs -translate-x-1/2 bottom-1 start-2/3 text-zinc-400 rtl:translate-x-1/2">
              500
            </span>
            <span className="absolute text-xs bottom-1 end-0 text-zinc-400">
              1000
            </span>
          </div>

          <div className="mt-6">
            <p>Total cost</p>
            <div className="flex flex-wrap items-center text-xl font-bold sm:items-end sm:gap-2 sm:text-3xl">
              <div className="flex flex-col basis-1/3 tabular-nums sm:basis-auto sm:flex-row sm:items-center sm:gap-2">
                {value}
                <span className="mb-1 text-sm font-normal text-zinc-600 sm:mb-0 dark:text-zinc-400">
                  shares
                </span>
              </div>
              <div className="text-center basis-1/3 sm:basis-auto">×</div>
              <span className="flex flex-col basis-1/3 tabular-nums sm:basis-auto sm:flex-row sm:items-center sm:gap-2">
                ${price}
                <span className="mb-1 ml-1 text-sm font-normal text-zinc-600 sm:mb-0 dark:text-zinc-400">
                  per share
                </span>
              </span>
              <div className="pt-2 mt-2 text-center border-t basis-full border-t-zinc-700 sm:mt-0 sm:basis-auto sm:border-0 sm:pt-0 sm:text-left">
                = <span>{(0, utils_1.formatNumber)(value * price)}</span>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-2 mt-6 font-bold bg-green-400 rounded-lg text-zinc-900 hover:bg-green-500" onClick={async () => {
                const response = await confirmPurchase(symbol, price, value);
                setPurchasingUI(response.purchasingUI);
                // Insert a new system message to the UI.
                setMessages((currentMessages) => [
                    ...currentMessages,
                    response.newMessage
                ]);
            }}>
            Purchase
          </button>
        </>) : status === 'completed' ? (<p className="mb-2 text-white">
          You have successfully purchased {value} ${symbol}. Total cost:{' '}
          {(0, utils_1.formatNumber)(value * price)}
        </p>) : status === 'expired' ? (<p className="mb-2 text-white">Your checkout session has expired!</p>) : null}
    </div>);
}
//# sourceMappingURL=stock-purchase.js.map