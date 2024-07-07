import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

const PeekButton = styled.button`
  margin-top: 20px;
`;

const GreenZone = styled.div<{ left: number }>`
  position: absolute;
  height: 100%;
  width: 20%;
  left: ${({ left }) => left}%;
  background: linear-gradient(to right, #5da626, #a3e635, #5da626);
  pointer-events: none;
`;

const SliderInput = styled.input`
  width: 100%;
  height: 40px;
  appearance: none;
  background: transparent;
  pointer-events: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 40px;
    background: red;
    cursor: pointer;
    pointer-events: all;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 40px;
    background: red;
    cursor: pointer;
    pointer-events: all;
  }
`;

const PointsDisplay = styled.div`
  margin-top: 20px;
`;

const Slider: React.FC = () => {
  const [greenZoneStart, setGreenZoneStart] = useState(0);
  const [peek, setPeek] = useState(false);
  const [userValue, setUserValue] = useState(50);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Randomize green zone start position
    setGreenZoneStart(Math.random() * 80); // Ensures the green zone is within the slider
  }, []);

  const calculatePoints = () => {
    const greenZoneMiddle = greenZoneStart + 10;
    const userPercentage = (userValue / 100) * 100;

    const distance = Math.abs(userPercentage - greenZoneMiddle);
    let score = 0;

    if (distance <= 2) {
      score = 4;
    } else if (distance <= 4) {
      score = 3;
    } else if (distance <= 6) {
      score = 2;
    }

    setPoints(score);
  };

  return (
    <div className="flex flex-col items-center">
      <SliderContainer className="rounded-full bg-gray-700">
        {peek && <GreenZone left={greenZoneStart} />}
        <SliderInput
          type="range"
          min="0"
          max="100"
          value={userValue}
          onChange={(e) => setUserValue(Number(e.target.value))}
        />
      </SliderContainer>
      <PeekButton
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onMouseDown={() => setPeek(true)}
        onMouseUp={() => setPeek(false)}
      >
        Peek
      </PeekButton>
      <PeekButton
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={calculatePoints}
      >
        Submit Guess
      </PeekButton>
      <PointsDisplay>Points: {points}</PointsDisplay>
    </div>
  );
};

export default Slider;
