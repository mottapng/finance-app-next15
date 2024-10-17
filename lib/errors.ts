export enum AuthErrorType {
  OAuthCallbackError = 'OAuthCallbackError',
  OAuthAccountNotLinked = 'OAuthAccountNotLinked',
  OAuthProfileParseError = 'OAuthProfileParseError',
  CallbackRouteError = 'CallbackRouteError',
}

const authErrorMessages: { [key in AuthErrorType]?: string } = {
  [AuthErrorType.OAuthCallbackError]:
    'Authentication provider returned an error! Please try again.',
  [AuthErrorType.OAuthAccountNotLinked]:
    'E-mail already in use with different provider! Please try another method of sign in.',
  [AuthErrorType.OAuthProfileParseError]:
    'An error occurred while parsing your data from the provider.',
  [AuthErrorType.CallbackRouteError]: 'Invalid Credentials! Please try again.',
}

export function getAuthErrorMessage(errorType: AuthErrorType | string): string {
  const authErrorType = errorType as keyof typeof authErrorMessages

  return authErrorMessages[authErrorType] || errorType
}
