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
        if (!ValidateFilled(input))
            throw new InvalidCredentialsException("Email не введен.");

        var email = input.Trim();
        if (!ValidateLength(email))
            throw new InvalidCredentialsException($"Превышено максимальное количество символов email ({EMAIL_MAX_LENGTH}).");

        if (!ValidateFormat(email))
            throw new InvalidCredentialsException("Email не корректен.");

        return new Email(email);
    }

    private static bool ValidateFilled(string email) => !string.IsNullOrWhiteSpace(email);
    private static bool ValidateLength(string email) => email.Length <= EMAIL_MAX_LENGTH;
    private static bool ValidateFormat(string email) => Regex.IsMatch(email, @"^(.+)@(mail\.ru|gmail\.com)$");
    public static bool Validate(string email) =>
        ValidateFilled(email)
        && ValidateLength(email)
        && ValidateFormat(email);

    public void SetIsVerified()
    {
        IsVerified = true;
    }
}