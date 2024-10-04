'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebar = useSidebar;
exports.SidebarProvider = SidebarProvider;
const React = __importStar(require("react"));
const LOCAL_STORAGE_KEY = 'sidebar';
const SidebarContext = React.createContext(undefined);
function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within a SidebarProvider');
    }
    return context;
}
function SidebarProvider({ children }) {
    const [isSidebarOpen, setSidebarOpen] = React.useState(true);
    const [isLoading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (value) {
            setSidebarOpen(JSON.parse(value));
        }
        setLoading(false);
    }, []);
    const toggleSidebar = () => {
        setSidebarOpen(value => {
            const newState = !value;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
            return newState;
        });
    };
    if (isLoading) {
        return null;
    }
    return (<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, isLoading }}>
      {children}
    </SidebarContext.Provider>);
}
//# sourceMappingURL=use-sidebar.js.map