"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageFromCode = exports.ResultCode = exports.getStringFromBuffer = exports.sleep = exports.runAsyncFnWithoutBlocking = exports.formatNumber = exports.nanoid = void 0;
exports.cn = cn;
exports.fetcher = fetcher;
exports.formatDate = formatDate;
exports.format = format;
exports.parseISO = parseISO;
exports.subMonths = subMonths;
const clsx_1 = require("clsx");
const nanoid_1 = require("nanoid");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.nanoid = (0, nanoid_1.customAlphabet)('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7); // 7-character random string
async function fetcher(input, init) {
    const res = await fetch(input, init);
    if (!res.ok) {
        const json = await res.json();
        if (json.error) {
            const error = new Error(json.error);
            error.status = res.status;
            throw error;
        }
        else {
            throw new Error('An unexpected error occurred');
        }
    }
    return res.json();
}
function formatDate(input) {
    const date = new Date(input);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}
const formatNumber = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
}).format(value);
exports.formatNumber = formatNumber;
const runAsyncFnWithoutBlocking = (fn) => {
    fn();
};
exports.runAsyncFnWithoutBlocking = runAsyncFnWithoutBlocking;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.sleep = sleep;
const getStringFromBuffer = (buffer) => Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
exports.getStringFromBuffer = getStringFromBuffer;
var ResultCode;
(function (ResultCode) {
    ResultCode["InvalidCredentials"] = "INVALID_CREDENTIALS";
    ResultCode["InvalidSubmission"] = "INVALID_SUBMISSION";
    ResultCode["UserAlreadyExists"] = "USER_ALREADY_EXISTS";
    ResultCode["UnknownError"] = "UNKNOWN_ERROR";
    ResultCode["UserCreated"] = "USER_CREATED";
    ResultCode["UserLoggedIn"] = "USER_LOGGED_IN";
})(ResultCode || (exports.ResultCode = ResultCode = {}));
const getMessageFromCode = (resultCode) => {
    switch (resultCode) {
        case ResultCode.InvalidCredentials:
            return 'Invalid credentials!';
        case ResultCode.InvalidSubmission:
            return 'Invalid submission, please try again!';
        case ResultCode.UserAlreadyExists:
            return 'User already exists, please log in!';
        case ResultCode.UserCreated:
            return 'User created, welcome!';
        case ResultCode.UnknownError:
            return 'Something went wrong, please try again!';
        case ResultCode.UserLoggedIn:
            return 'Logged in!';
    }
};
exports.getMessageFromCode = getMessageFromCode;
function format(date, formatString) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    return formatString
        .replace('yyyy', year.toString())
        .replace('yy', String(year).slice(-2))
        .replace('LLL', monthNames[month])
        .replace('MM', String(month + 1).padStart(2, '0'))
        .replace('dd', String(day).padStart(2, '0'))
        .replace('d', day.toString())
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}
function parseISO(dateString) {
    return new Date(dateString);
}
function subMonths(date, amount) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - amount);
    return newDate;
}
//# sourceMappingURL=utils.js.map