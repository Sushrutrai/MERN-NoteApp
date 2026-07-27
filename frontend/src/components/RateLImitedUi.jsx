import React from "react";
import { ZapOff } from "lucide-react";

const RateLImitedUi = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-secondary/65 border border-primary/50 rounded-lg shadow-md ">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/60 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapOff className="size-10 text-base-300/80" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-xl mb-2 text-base-300">Rate Limit Reached</h3>
            <p className="text-base-200 mb-1">
              You've made too many requests in a short time. Please wait a
              moment.
            </p>
            <p className="text-sm text-base-100/80">
              Try again in a few seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLImitedUi;
