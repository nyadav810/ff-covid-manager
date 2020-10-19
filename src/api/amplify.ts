import { Auth } from "aws-amplify";

export async function signup(
  username: string,
  password: string,
  email: string
): Promise<string> {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });

    return user.getUsername();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function verifyEmail(
  username: string,
  code: string
): Promise<string> {
  try {
    const response = await Auth.confirmSignUp(username, code);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function login(
  username: string,
  password: string
): Promise<string> {
  try {
    const user = await Auth.signIn(username, password);

    return user.getUsername();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout(): Promise<any> {
  try {
    await Auth.signOut();
  } catch (error) {
    return Promise.reject(error);
  }
}
