using ErrorOr;

namespace Flags.Domain.Common.Errors;

public static partial class Errors
{
    public static class Authentication
    {
        public static Error InvalidCredentials => Error.Validation(
            code: "Auth.InvalidCredentials",
            description: "�������� ����� ��� ������!"
        );

        public static Error UserNotFound => Error.NotFound(
            code: "Auth.UserNotFound",
            description: "������������ �� ����������."
        );
    }
}