import { createContext, useContext } from "react";

interface PrivacyContextValue {
  openPrivacy: () => void;
}

export const PrivacyContext = createContext<PrivacyContextValue>({ openPrivacy: () => {} });

export const usePrivacy = () => useContext(PrivacyContext);
