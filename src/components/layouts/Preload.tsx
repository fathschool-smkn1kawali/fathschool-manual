import React from "react";
import { ThreeDots } from "react-loader-spinner";

/**
 * Preload component that displays a loading spinner.
 * 
 * @returns {JSX.Element} The JSX element representing the preload screen.
 */
const Preload: React.FC = (): React.ReactElement => {
  return (
    <main className="h-screen flex items-center justify-center overflow-hidden">
      <ThreeDots
        visible={true}
        height="70"
        width="70"
        color="#006FEE"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </main>
  );
};

export default Preload;
