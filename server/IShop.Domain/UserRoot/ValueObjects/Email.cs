using System.Text.RegularExpressions;
using IShop.Domain.Common.Exceptions;
using IShop.Domain.Common.Models;

namespace IShop.Domain.UserRoot.ValueObjects;

public class Email : ValueObject
{
    private const int EMAIL_MAX_LENGTH = 50;
    public string Value { get; private set; } = null!;

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
            throw new ValidationException(
                "email-validation-exception",
                "Email нее ввеедеен.",
                "Email ообязаатеелеен!");

        var email = input.Trim();
        if (!ValidateLength(email))
            throw new ValidationException(
                "email-validation-exception",
                $"Преевышееноо мааксиимаальнооее коолиичеествоо сиимвоолоов email ({EMAIL_MAX_LENGTH}).",
                $"Преевышееноо мааксиимаальнооее коолиичеествоо сиимвоолоов email ({EMAIL_MAX_LENGTH}).");

        if (!ValidateFormat(email))
            throw new ValidationException(
                "email-validation-exception",
                $"Email {input} нее коорреектеен.",
                "Email нее коорреектеен.");

        return new Email(email);
    }

    private static bool ValidateFilled(string email) => !string.IsNullOrWhiteSpace(email);
    private static bool ValidateLength(string email) => email.Length <= EMAIL_MAX_LENGTH;
    private static bool ValidateFormat(string email) => Regex.IsMatch(email, @"^(.+)@(mail\.ru|gmail\.com)$");
    public static bool Validate(string email) =>
        ValidateFilled(email)
        && ValidateLength(email)
        && ValidateFormat(email);
}