import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const MyLoader: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={260}
    viewBox="0 0 1000 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    uniqueKey="my-loader" // Added uniqueKey to ensure consistent IDs
    {...props}
  >
    <rect x="1" y="6" rx="4" ry="4" width="210" height="210" /> 
    <rect x="2" y="227" rx="4" ry="4" width="165" height="17" /> 
    <rect x="2" y="248" rx="4" ry="4" width="127" height="12" />
  </ContentLoader>
);

export default MyLoader;
