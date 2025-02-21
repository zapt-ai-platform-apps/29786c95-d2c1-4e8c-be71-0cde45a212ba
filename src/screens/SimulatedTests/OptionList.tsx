import React from 'react';

type OptionListProps = {
  options: string[];
  handleOptionChange: (index: number) => void;
  submitted: boolean;
};

function OptionList({ options, handleOptionChange, submitted }: OptionListProps) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option, idx) => (
        <label key={idx} className="cursor-pointer">
          <input
            type="radio"
            name="option"
            value={idx}
            onChange={() => handleOptionChange(idx)}
            className="mr-2 box-border"
            disabled={submitted}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default OptionList;