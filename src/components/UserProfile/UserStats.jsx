import "./UserStats.css";

import { TodayStatistics } from "./TodaysProgress";
import { YesterdayStatistics } from "./YesterdaysProgress";
import { SevenData } from "./PastSeven";
import { TwentyEightData } from "./PastTwentyEight";
import { GoBackButton } from "../Buttons/GoBackButton";

export const UserStatistics = () => {
  return (
    <>
      <h1 className="statistics-Title">Task Completion Data</h1>
      <div className="allContainers">
        <section className="todays-stats">
          <TodayStatistics />
        </section>
        <section className="yesterdays-stats">
          <YesterdayStatistics />
        </section>
        <section className="pastSeven">
          <SevenData />
        </section>
        <section className="pastTwentyEight">
          <TwentyEightData />
        </section>
      </div>

      <GoBackButton />
    </>
  );
};
