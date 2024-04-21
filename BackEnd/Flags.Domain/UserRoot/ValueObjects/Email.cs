using System.Text.RegularExpressions;
using ErrorOr;
using Flags.Domain.Common.Errors;
using Flags.Domain.Common.Models;

namespace Flags.Domain.UserEntity.ValueObjects;

public class Email : ValueObject
{
    public string Value { get; private set; } = null!;

    private Email(string value)
    {
        Value = value;
    }
    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public static ErrorOr<Email> Create(string input, string[] existingEmails)
    {
        if (string.IsNullOrWhiteSpace(input))
            return Errors.Authentication.InvalidCredentials;

        var email = input.Trim();

        if (email.Length > 50)
            return Errors.Authentication.InvalidCredentials;

        if (Regex.IsMatch(email, @"^(.+)@(.+)$") == false)
            return Errors.Authentication.InvalidCredentials;

        if (existingEmails.Contains(email))
            return Errors.User.DuplicateEmail;

        return new Email(email);
    }
}