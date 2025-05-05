import React from "react";
import { useGastroContext } from "@/lib/gastro-provider";
import GastroSearch from "@/components/gastro-search";
import { AnimatePresence } from "framer-motion";
import { GastroResult } from "./gastro-results";

const GastroWrapper: React.FC = () => {
  const { gastroQuery, setGastroInput } = useGastroContext();

  return (
    <>
      {gastroQuery ? (
        <AnimatePresence
          key="results"
          onExitComplete={() => {
            setGastroInput("");
          }}
          mode="wait"
        >
          <GastroResult key="results" />
        </AnimatePresence>
      ) : (
        <AnimatePresence key="home" mode="wait">
          <GastroSearch key="home" />
        </AnimatePresence>
      )}
    </>
  );
};

export default GastroWrapper;
