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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

export const REGISTER_USER = gql`
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

export const SHARE_VIDEO = gql`
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
