import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type GastroContextType = {
  gastroQuery: string;
  setGastroQuery: (query: string) => void;
  gastroInput: string;
  setGastroInput: (input: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  gastroResult: GastroResult | null;
  setGastroResult: (result: GastroResult) => void;
};

type GastroResult = {
  answer: string;
  sources: string[];
};

const GastroContext = createContext<GastroContextType | undefined>(undefined);

export const GastroProvider = ({ children }: { children: ReactNode }) => {
  const [gastroQuery, setGastroQuery] = useState<string>("");
  const [gastroInput, setGastroInput] = useState<string>("");
  const [gastroResult, setGastroResult] = useState<GastroResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!gastroQuery) {
      setGastroResult(null);
      setGastroInput("");
    }
  }, [gastroQuery, gastroResult]);

  return (
    <GastroContext.Provider
      value={{
        gastroQuery,
        setGastroQuery,
        gastroInput,
        setGastroInput,
        isLoading,
        setIsLoading,
        gastroResult,
        setGastroResult,
      }}
    >
      {children}
    </GastroContext.Provider>
  );
};

export const useGastroContext = () => {
  const context = useContext(GastroContext);
  if (context === undefined) {
    throw new Error("useGastroContext must be used within a GastroProvider");
  }
  return context;
};
