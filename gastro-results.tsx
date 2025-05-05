"use client";

import { useGastroContext } from "@/lib/gastro-provider";
import { LoaderCircleIcon } from "lucide-react";
import { useCoAgent } from "@copilotkit/react-core";
import { SkeletonLoader } from "./skeleton-loader";
import { GastroAnswer } from "./gastro-answer";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function GastroResult() {
  const { gastroQuery } = useGastroContext();
  const { state: agentState } = useCoAgent({
    name: "gastro_agent",
  });

  console.log("AGENT_STATE", agentState);

  const isLoading = !agentState?.type;

  console.log(isLoading)
  return (
    <div className="min-h-screen bg-background text-foreground ">
      <div className="container mx-auto   space-y-12 items-center p-8 lg:p-4 flex flex-col gap-y-8 mt-4 lg:mt-6 text-sm lg:text-base">
        <div className="w-full max-w-5xl flex justify-between items-end border-b-2 pb-4 border-gray-600">
          <Link href={"/"} className="text-4xl md:text-5xl font-bold">
            Gastro
          </Link>
          <ModeToggle />
        </div>

        <div className="w-full max-w-5xl">
          <h1 className="text-2xl lg:text-3xl font-extralight text-left">
            {gastroQuery}
          </h1>

          <div className="mt-6">
            <div className=" flex flex-col">
              {isLoading ? (
                <>
                  {" "}
                  <h2 className="flex items-center gap-x-2">
                    <LoaderCircleIcon className="animate-spin w-4 h-4 text-slate-500" />
                    Answer
                  </h2>
                </>
              ) : (
                <></>
              )}

              <div className="text-slate-500 font-light">
                {isLoading ? (
                  <SkeletonLoader />
                ) : (
                  <GastroAnswer
                    type={agentState?.type}
                    result={agentState?.result}
                    recipes={agentState?.recipes}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
