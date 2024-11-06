import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaData = ({ title }) => {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${title} - JobBox`}</title>
        </Helmet>
      </div>
    </HelmetProvider>
  );
};

export default MetaData;
