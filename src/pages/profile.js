import React, { useEffect, useState } from "react";
import ProfileElemnts from "../components/ProfileElemnts";
import { connect } from "react-redux";
import { getProfile, askQuestion } from "../flux/actions";
import { Spinner, Center, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const Profile = ({
  isAuthenticated,
  getProfile,
  askQuestion,
  match,
  user,
  profile,
  isLoading,
  isItemLoading,
  error,
}) => {
  const { username } = match.params;
  const isOwner = isAuthenticated && user.username === username ? true : false;

  useEffect(() => {
    getProfile(username);
  }, [isAuthenticated]);

  return (
    <>
      {error.status === 404 ? (
        <>
          <Center pt="20rem" opacity='30%' >
            <WarningIcon boxSize="3rem" me="1rem" />{" "}
            <Text fontSize="3xl"> Not Found </Text>
          </Center>
        </>
      ) : isLoading ? (
        <Center pt="20rem" opacity='30%' >
     <Spinner  size="xl" />
      </Center>
      
      ) : (
        <ProfileElemnts
          askQuestion={askQuestion}
          isOwner={isOwner}
          user={profile}
          isItemLoading={isItemLoading}
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
    isItemLoading: state.profiles.profile.isItemLoading,
    error: state.error,
  };
};
export default connect(mapStateToProps, { getProfile, askQuestion })(Profile);
