using ErrorOr;
using Microsoft.AspNetCore.Http;

namespace Flags.Domain.Common.Errors;

public static partial class Errors
{
    public static class User
    {
        public static Error DuplicateEmail => Error.Conflict(
            code: "User.DuplicateEmail",
            description: "Email ����� ������ �������������.");

        public static Error DuplicatePhone => Error.Conflict(
            code: "User.DuplicatePhone",
            description: "����� �������� ����� ������ �������������.");

        public static Error NotFound => Error.NotFound(
            code: "User.NotFound",
            description: "������������ �� ����������.");

        public static Error InvalidInput => Error.Failure(
            code: "User.InvalidInput",
            description: "���� �� ���������.");

        public static Error UserNotAuthenticated => Error.Unauthorized(
            code: "Auth.UserNotAuthenticated",
            description: "������������ �� ����������������.");
    }
}