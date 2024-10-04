"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = (0, react_1.useState)(initialValue);
    (0, react_1.useEffect)(() => {
        // Retrieve from localStorage
        const item = window.localStorage.getItem(key);
        if (item) {
            setStoredValue(JSON.parse(item));
        }
    }, [key]);
    const setValue = (value) => {
        // Save state
        setStoredValue(value);
        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    return [storedValue, setValue];
};
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=use-local-storage.js.map