import React from 'react';
import { useState } from 'react';

interface BountyProps {
  value: number;
  onChange: (value: number | null) => void;
}

export const Bounty: React.FC<BountyProps> = ({ value, onChange }) => {
  const [enableBounty, setEnableBounty] = useState<boolean>(false);
  return (
    <div className="bg-iconGrey rounded-md p-2 mt-4">
      <div className="flex items-center p-0 rounded-md bg-iconGrey">
        <div className="font-semibold text-lg">Want to add Bounty</div>
        <div className="grid bg-white rounded-md grid-cols-2 grid-rows-1 gap-1 ml-3 items-center">
          <div
            onClick={() => {
              setEnableBounty(true);
              onChange(1);
            }}
            className={`${
              enableBounty
                ? 'bg-iconBlue text-white font-semibold'
                : 'bg-white text-iconBlue'
            } p-2 rounded-md cursor-pointer w-12 text-center`}
          >
            Yes
          </div>
          <div
            onClick={() => {
              setEnableBounty(false);
              onChange(null);
            }}
            className={`${
              !enableBounty
                ? 'bg-iconBlue text-white font-semibold'
                : 'bg-white text-iconBlue'
            } p-2 rounded-md cursor-pointer w-12 text-center`}
          >
            No
          </div>
        </div>
      </div>
      {enableBounty && (
        <div className="mt-2">
          <div className="text-lg mt-4">Enter Bounty amount</div>
          <div className=" my-2 py-2 w-24 bg-gray-200 rounded-md outline-none flex justify-around items-center">
            <input
              className="bg-transparent outline-none font-semibold"
              type="number"
              min={1}
              max={5}
              value={value}
              onChange={(e) => onChange(+e.target.value)}
            />
            <p className=" font-bold border-l-2 pl-2 border-gray-500">Eth</p>
          </div>
        </div>
      )}
    </div>
  );
};
