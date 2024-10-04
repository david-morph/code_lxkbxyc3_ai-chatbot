'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = exports.Stocks = exports.Purchase = exports.Stock = exports.SystemMessage = exports.BotMessage = exports.BotCard = exports.spinner = void 0;
const dynamic_1 = __importDefault(require("next/dynamic"));
const stock_skeleton_1 = require("./stock-skeleton");
const stocks_skeleton_1 = require("./stocks-skeleton");
const events_skeleton_1 = require("./events-skeleton");
var spinner_1 = require("./spinner");
Object.defineProperty(exports, "spinner", { enumerable: true, get: function () { return spinner_1.spinner; } });
var message_1 = require("./message");
Object.defineProperty(exports, "BotCard", { enumerable: true, get: function () { return message_1.BotCard; } });
Object.defineProperty(exports, "BotMessage", { enumerable: true, get: function () { return message_1.BotMessage; } });
Object.defineProperty(exports, "SystemMessage", { enumerable: true, get: function () { return message_1.SystemMessage; } });
const Stock = (0, dynamic_1.default)(() => import('./stock').then(mod => mod.Stock), {
    ssr: false,
    loading: () => <stock_skeleton_1.StockSkeleton />
});
exports.Stock = Stock;
const Purchase = (0, dynamic_1.default)(() => import('./stock-purchase').then(mod => mod.Purchase), {
    ssr: false,
    loading: () => (<div className="h-[375px] rounded-xl border bg-zinc-950 p-4 text-green-400 sm:h-[314px]"/>)
});
exports.Purchase = Purchase;
const Stocks = (0, dynamic_1.default)(() => import('./stocks').then(mod => mod.Stocks), {
    ssr: false,
    loading: () => <stocks_skeleton_1.StocksSkeleton />
});
exports.Stocks = Stocks;
const Events = (0, dynamic_1.default)(() => import('./events').then(mod => mod.Events), {
    ssr: false,
    loading: () => <events_skeleton_1.EventsSkeleton />
});
exports.Events = Events;
//# sourceMappingURL=index.js.map