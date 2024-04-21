using ErrorOr;
using Flags.Domain.Common.Errors;

namespace Flags.Domain.UserEntity.ValueObjects;

public class Password
{
    private const int HASH_LENGTH = 60;
    private Password(string value)
    {
        Value = value;
    }

    public string Value { get; private set; } = null!;

    public static ErrorOr<Password> Create(string passwordHash)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
            return Errors.Authentication.InvalidCredentials;

        var password = passwordHash.Trim();

        if (password.Length != HASH_LENGTH)
            return Errors.Authentication.InvalidCredentials;

        return new Password(password);
    }
}