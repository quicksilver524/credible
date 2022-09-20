import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      likeCount
      dislikeCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;
export const QUERY_POST = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      likeCount
      dislikeCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        likeCount
        dislikeCount
      }
    }
  }
`;
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        likeCount
        dislikeCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;
