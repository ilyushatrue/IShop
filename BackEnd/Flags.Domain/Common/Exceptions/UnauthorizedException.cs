namespace Flags.Domain.Common.Exceptions;

public class NotAuthenticatedException(string? message = null) : Exception(message ?? "Пользователь не аутентифицирован.")
{
}
