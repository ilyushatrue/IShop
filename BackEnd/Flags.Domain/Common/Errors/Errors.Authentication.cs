using ErrorOr;

namespace Flags.Domain.Common.Errors;

public static partial class Errors
{
    public static class Authentication
    {
        public static Error InvalidCredentials => Error.Validation(
            code: "Auth.InvalidCredentials",
            description: "Неверный логин или пароль!"
        );

        public static Error UserNotFound => Error.NotFound(
            code: "Auth.UserNotFound",
            description: "Пользователя не существует."
        );
        public static Error ServerError => Error.Failure(
            code: "Auth.UnableToLogout",
            description: "Возникла ошибка. Обратитесь к администратору!"
        );
    }
}