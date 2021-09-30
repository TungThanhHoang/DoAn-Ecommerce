export const AuthReducer = (state, action) => {
    const {
      type,
      payload: { isAuth, user },
    } = action;
    switch (type) {
      case "SET_AUTH":
        return {
          ...state,
          isLoading: false,
          isAuth,
          user,
        };
      default:
        return state;
    }
  };
  