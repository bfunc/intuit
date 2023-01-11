import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { icons } from './icons';
import { machine } from './machine';

export const App = () => {

  const [ mode, setMode ] = useState<string>(machine.value);
  const [ suggestions, setSuggestions ] = useState<[] | { title: string, link: string }[]>([]);
  const [ suggestionsMix, setSuggestionsMix ] = useState<number>(0);

  const handleClick = (): void => {
    machine.init(`click`);
    setMode(machine.value);
  }

  const renderEmoji = (modeName: string): ReactElement => {
    switch (modeName) {
      case `happy`: return icons.happy
      case `sad`: return icons.sad;
      default: return icons.neutral
    }
  }

  const getSuggestions = async (): Promise<void> => {
    try {
      const res = await axios.get(`http://localhost:3000/suggestions`, { timeout: 3000 });
      setSuggestions(res.data)
    }
    catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    if (machine.value === `sad`) {
      if (suggestions.length === 0) {
        getSuggestions();
      }
      setSuggestionsMix(Math.floor(Math.random() * suggestions.length));
    }
  }, [ mode, suggestions.length ]);

  return (
    <div className={`app`}>
      <h1>
        How are you today?
      </h1>

      <button onClick={handleClick} type={`button`}>
        {renderEmoji(machine.value)}
      </button>

      {machine.value === `sad` && suggestions[ suggestionsMix ] &&
        <a target={`_blank`} href={suggestions[ suggestionsMix ].link}>
          Try {suggestions[ suggestionsMix ].title}.
        </a>}
    </div>
  );
}