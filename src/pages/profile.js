import React, { useEffect, useState } from "react";
import ProfileElemnts from "../components/ProfileElemnts";
import { connect } from "react-redux";
import { getProfile, askQuestion } from "../flux/actions";
import { Spinner } from "@chakra-ui/react";

const Profile = ({
  isAuthenticated,
  getProfile,
  askQuestion,
  match,
  user,
  profile,
  isLoading,
  error,
}) => {
  const { username } = match.params;
  const isOwner = isAuthenticated && user.username === username ? true : false;

  console.log("render");
  useEffect(() => {
    getProfile(username);
  }, [isAuthenticated]);

  return (
    <>
      {error.status === 404 ? (
        <p>not found</p>
      ) : isLoading ? (
        <Spinner size="xl" />
      ) : (
        <ProfileElemnts
          askQuestion={askQuestion}
          isOwner={isOwner}
          user={profile}
        ></ProfileElemnts>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profiles.profile,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.profiles.isLoading,
    error: state.error,
  };
};
export default connect(mapStateToProps, { getProfile, askQuestion })(Profile);
