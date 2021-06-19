import { gql } from "@apollo/client";

export const FETCH_VIDEOS_QUERY = gql`
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

export const LOGIN_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation register($email: String!, $password: String!) {
    register(
      registerInput: {
        email: $email
        password: $password
        confirmPassword: $password
      }
    ) {
      id
      email
      token
    }
  }
`;

export const SHARE_VIDEO_MUTATION = gql`
  mutation shareVideo($url: String!) {
    shareVideo(url: $url) {
      id
      url
      email
      votes {
        id
        email
        status
      }
    }
  }
`;

export const VOTE_VIDEO_MUTATION = gql`
  mutation voteVideo($videoId: ID!, $status: String!) {
    voteVideo(videoId: $videoId, status: $status) {
      id
      votes {
        id
        email
        status
      }
    }
  }
`;
