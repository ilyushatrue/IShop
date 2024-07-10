namespace Flags.Domain.Common.Exceptions;
public class InvalidUsageException(string message, string errorName) : Exception(message)
{
    public string ErrorName { get; } = errorName;
}
