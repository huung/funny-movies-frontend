import React from "react";
import { gql, useQuery } from "@apollo/client";
import Container from "@material-ui/core/Container";
import { Video } from "../defines/video";

const FETCH_VIDEOS_QUERY = gql`
  {
    getVideos {
      id
      url
      createdAt
      email
      votes {
        email
        status
      }
    }
  }
`;

export default function Home(): React.ReactElement {
  const { loading, data } = useQuery(FETCH_VIDEOS_QUERY);
  const videos: Video[] = data?.getVideos;

  return (
    <Container maxWidth="lg">
      {loading ? <h1>Loading... Please wait...</h1> : <></>}
      {videos ? (
        videos.map((video: Video) => <div key={video.id}>{video.url}</div>)
      ) : (
        <></>
      )}
    </Container>
  );
}
