using System.Text.RegularExpressions;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.Common.Models;

namespace Flags.Domain.UserRoot.ValueObjects;

public class Email : ValueObject
{
    private const int EMAIL_MAX_LENGTH = 50;
    public string Value { get; private set; } = null!;
    public bool IsVerified { get; private set; }

    private Email(string value)
    {
        Value = value;
    }
    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public static Email Create(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
            throw new InvalidCredentialsException("Email не введен.");

        var email = input.Trim();

        if (email.Length > EMAIL_MAX_LENGTH)
            throw new InvalidCredentialsException($"Превышено максимальное количество символов email ({EMAIL_MAX_LENGTH}).");

        if (Regex.IsMatch(email, @"^(.+)@(.+)$") == false)
            throw new InvalidCredentialsException("Email не корректен.");

        return new Email(email);
    }

    public void SetIsVerified()
    {
        IsVerified = true;
    }
}