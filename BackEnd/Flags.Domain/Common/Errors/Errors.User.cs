using ErrorOr;

namespace Flags.Domain.Common.Errors;

public static partial class Errors
{
    public static class User
    {
        public static Error DuplicateEmail => Error.Conflict(
            code: "User.DuplicateEmail",
            description: "Email is already in use.");

        public static Error DuplicatePhone => Error.Conflict(
            code: "User.DuplicatePhone",
            description: "Phone is already in use.");

        public static Error NotFound => Error.NotFound(
            code: "User.NotFound",
            description: "User with provided Id does not exist.");

        public static Error InvalidInput => Error.Failure(
            code: "User.InvalidInput",
            description: "Provided Id is not correct.");

        public static Error UserNotAuthenticated => Error.Unauthorized(
            code: "Auth.UserNotAuthenticated",
            description: "Пользователь не аутентифицирован.");

    }
}