import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        timeIn
        timeOut
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      likeCount
      dislikeCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      likeCount
      dislikeCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout($credits: String!, $price: Int!) {
    checkout(credits: $credits, price: $price) {
      session
    }
  }
`;

export const RECHARGE = gql`
  mutation Recharge($point: Int!) {
    recharge(point: $point) {
      _id
      points
    }
  }
`;

export const LIKE_THOUGHT = gql`
  mutation LikeThought($thoughtId: ID!) {
    likeThought(thoughtId: $thoughtId) {
      _id
      likeCount
    }
  }
`;

export const DISLIKE_THOUGHT = gql`
  mutation LikeThought($thoughtId: ID!) {
    dislikeThought(thoughtId: $thoughtId) {
      _id
      dislikeCount
    }
  }
`;
