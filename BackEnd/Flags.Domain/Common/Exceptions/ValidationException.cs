namespace Flags.Domain.Common.Exceptions;

public class ValidationException(string? message = null) : Exception(message ?? "Данные не корректны.")
{
}
