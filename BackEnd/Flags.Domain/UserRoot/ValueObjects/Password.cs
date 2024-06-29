using Flags.Domain.Common.Exceptions;

namespace Flags.Domain.UserRoot.ValueObjects;

public class Password
{
    private const int HASH_LENGTH = 60;
    private Password(string value)
    {
        Value = value;
    }

    public string Value { get; private set; } = null!;

    public static Password Create(string passwordHash)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
            throw new ArgumentNullException(nameof(passwordHash), "Пароль необходим.");

        var password = passwordHash.Trim();

        if (password.Length != HASH_LENGTH)
            throw new ValidationException($"Превышена допустимая длина пароля ({HASH_LENGTH}).");

        return new Password(password);
    }
}