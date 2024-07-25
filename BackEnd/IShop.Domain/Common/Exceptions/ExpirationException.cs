namespace IShop.Domain.Common.Exceptions;

public class ExpirationException(string name, string logMessage, string? userMessage = null) : Exception(logMessage)
{
    public string Name { get; private set; } = name;
    public string? UserMessage { get; private set; } = userMessage;
}
