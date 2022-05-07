import React from 'react';
import Navigation from './common/Navigation';

interface GreetingsProps {
  name: string
}

const Greetings:React.FC<GreetingsProps> = (props: GreetingsProps) => {
  return (
    <>
        <Navigation />
        <div>Hello {props.name}</div>
    </>
  );
};

export default Greetings;
